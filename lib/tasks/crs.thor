# -*- coding: utf-8 -*-

class Crs < Thor
  desc "create", "create config to other server"
  def create
    require './config/environment'
    require 'erubis'

    chr_sets = [
      CS_RIRINRA,
      CS_WA,
      CS_SF,
      CS_GER,
      CS_MAD,
      CS_TIME,

      CS_CHANGED,
      CS_ANIMAL,
      CS_SCHOOL,

      CS_ALL,
    ]

    chr_jobs_hash = chr_sets.each_with_object({}) do |cs,o|
      o[cs.chr_set._id] = cs.chr_job
      cs.chr_job.each {|o| o.delete("_id") }
    end


    append  = [Hashie::Mash.new("face_id"=>"all", "job"=>"かみさま", "chr_set_id"=>"all")]
    rejects = %w[r12 gc61]
    CS_ALL.chr_job = (chr_jobs_hash.values.flatten | append).uniq {|o| o.face_id }.reject {|o| rejects.member? o.face_id }

    ([CS_ALL] + chr_sets).map do |cs|
      faces = cs.chr_job.map {|job| FACE.find {|f| f.face_id == job.face_id } }.compact
      cs.chr_npc.map do |npc|
        {csid: npc.csid, set: cs.chr_set, chr_jobs: cs.chr_job, npc: npc, faces: faces }
      end
    end.flatten.each do | params |
      CrsCreate.new.activate(Hashie::Mash.new params)
    end
  end


  class WebHtml
    def render_exec
      @content_for_layout = Erubis::Eruby.new(File.open(@rhtml_content){|f| f.read}).evaluate(self)
      @content_for_layout = Erubis::Eruby.new(File.open(@rhtml_layout ){|f| f.read}).evaluate(self) if @rhtml_layout
    end
    def to_s
      render_exec
      return @content_for_layout
    end
    def render( ml = :html)
      render_exec
      print "Content-Type: text/%s\r\n\r\n"%[ ml.to_s ]
      print @content_for_layout
    end
  end

  class CrsCreate < WebHtml
    def activate( params )
      @csid   = params.csid
      @chrset = params.set
      @chrnpc = params.npc

      perl_change = -> s { s.gsub(/[—ソЫⅨ㎇噂浬欺圭構蚕十申曾箪貼能表暴予禄兔喀媾彌拿杤歃濬畚秉綵臀藹觸軆鐔饅鷭偆砡纊犾](?!\\)/){ $& + '\\' }}
      @chrnpc.say_0 = perl_change.call @chrnpc.say_0.inspect
      @chrnpc.say_1 = perl_change.call @chrnpc.say_1.inspect

      jobs  = params.chr_jobs
      job_groups = jobs.group_by(&:face_id)

      faces = params.faces
      faces.each do |face|
        face.name = perl_change.call face.name
        job = job_groups[face.face_id].first

        [:job].each do |col|
          face[col] = perl_change.call job[col]
        end
      end
      @orders = faces.sort_by(&:order)
      @lists  = faces.sort_by(&:face_id)

      @rhtml_content      = "./app/views/sow/crs.pl.erb"

      @rhtml_src_testbed_out  = "/www/sow-giji/show-fix/rs/crs_"  + @csid +".pl"
      @rhtml_src_angular_out  = "/www/sow-giji/show-fix/rs/crs_"  + @csid +".pl"
      @rhtml_src_cabala_out   = "/www/sow-giji/cabala/rs/crs_"   + @csid +".pl"

      @rhtml_testbed_out  = "/www/giji_log/testbed/rs/crs_"  + @csid +".pl"
      @rhtml_wolf_out     = "/www/giji_log/wolf/rs/crs_"     + @csid +".pl"
      @rhtml_ultimate_out = "/www/giji_log/ultimate/rs/crs_" + @csid +".pl"
      @rhtml_cabala_out   = "/www/giji_log/cabala/rs/crs_"   + @csid +".pl"
      @rhtml_lobby_out    = "/www/giji_log/lobby/rs/crs_"    + @csid +".pl"

      result = to_s

      File.open(@rhtml_src_testbed_out ,'w:sjis:utf-8'){|f| f.write( result ) }
      File.open(@rhtml_src_angular_out ,'w:sjis:utf-8'){|f| f.write( result ) }
      File.open(@rhtml_src_cabala_out  ,'w:sjis:utf-8'){|f| f.write( result ) }
      FileUtils.chmod( 0666, @rhtml_src_testbed_out )
      FileUtils.chmod( 0666, @rhtml_src_angular_out )
      FileUtils.chmod( 0666, @rhtml_src_cabala_out  )

      File.open(@rhtml_testbed_out ,'w:sjis:utf-8'){|f| f.write( result ) }
      File.open(@rhtml_wolf_out    ,'w:sjis:utf-8'){|f| f.write( result ) }
      File.open(@rhtml_ultimate_out,'w:sjis:utf-8'){|f| f.write( result ) }
      File.open(@rhtml_cabala_out  ,'w:sjis:utf-8'){|f| f.write( result ) }
      File.open(@rhtml_lobby_out   ,'w:sjis:utf-8'){|f| f.write( result ) }
      FileUtils.chmod( 0666, @rhtml_testbed_out )
      FileUtils.chmod( 0666, @rhtml_lobby_out   )
      FileUtils.chmod( 0666, @rhtml_cabala_out  )
      FileUtils.chmod( 0666, @rhtml_ultimate_out)
      FileUtils.chmod( 0666, @rhtml_wolf_out  )
    end
  end
end