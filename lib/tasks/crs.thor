# -*- coding: utf-8 -*-


class Crs < Thor
  desc "create", "create config to other server"
  def create
    require './config/environment'
    require './lib/rsync'
    require 'erubis'

    print "\n---\n"

    # chr set create.
    chr_sets = [
      CS_RIRINRA,
      CS_WA,
      CS_SF,
      CS_FABLE,
      CS_GER,
      CS_MAD,
      CS_TIME,

      CS_CHANGED,
      CS_ANIMAL,
      CS_SCHOOL,

      CS_ALL,
    ]

    CHR_FACE.each do |face|
      face.face_id = face._id
    end

    chr_jobs_hash = chr_sets.each_with_object({}) do |cs,o|
      o[cs.chr_set._id] = cs.chr_job
      cs.chr_job.each {|o| o.delete("_id") }
    end


    rejects = %w[r12 gc61]
    CS_ALL.chr_job = (chr_jobs_hash.values.flatten).uniq {|o| o.face_id }.reject {|o| rejects.member? o.face_id }

    ([CS_ALL] + chr_sets).map do |cs|
      faces = cs.chr_job.map {|job| CHR_FACE.find {|f| f._id == job.face_id } }.compact
      cs.chr_npc.map do |npc|
        { csid: npc.csid, set: cs.chr_set, chr_jobs: cs.chr_job, npc: npc, faces: faces }
      end
    end.flatten.each do | params |
      CrsCreate.new.activate(Hashie::Mash.new params)
    end

    # tag create.
    TagCreate.new.activate

    print "\n---\n"

    rsync = Giji::RSync.new
    rsync.each do |folder, protocol, set|
      rsync.put(protocol, set, 'rs/', :lapp, :app)
    end
    rsync.exec
  end


  class WebHtml
    def render_exec
      @content_for_layout = Erubis::Eruby.new(File.open(@rhtml_content){|f| f.read}).evaluate(self)
      @content_for_layout = Erubis::Eruby.new(File.open(@rhtml_layout ){|f| f.read}).evaluate(self) if @rhtml_layout
    end
    def to_s
      render_exec
      result = @content_for_layout
      result = result.gsub( /[〜～]/, '～' )
      result = result.gsub( /[✡ʃ卐]/ ) do |chr|
        "&#x#{chr.ord.to_s(16)};"
      end
      result = result.gsub(/[―—ソЫⅨ㎇噂浬欺圭構蚕十申曾箪貼能表暴予禄兔喀媾彌拿杤歃濬畚秉綵臀藹觸軆鐔饅鷭偆砡纊犾](?!\\)/) do |chr|
        chr + '\\'
      end
      return result
    end
    def render( ml = :html)
      render_exec
      print "Content-Type: text/%s\r\n\r\n"%[ ml.to_s ]
      print @content_for_layout
    end
  end

  class TagCreate < WebHtml
    def activate
      @tags = SOW_TAG

      @rhtml_content = "./asset/sow/tag.pl.erb"
      result = to_s

      @rhtml_src_testbed_out = "/www/sow-giji/show-fix/rs/tag.pl"
      @rhtml_src_cabala_out  = "/www/sow-giji/cabala/rs/tag.pl"

      @rhtml_testbed_out  = "/www/giji_log/testbed/rs/tag.pl"
      @rhtml_wolf_out     = "/www/giji_log/wolf/rs/tag.pl"
      @rhtml_ultimate_out = "/www/giji_log/ultimate/rs/tag.pl"
      @rhtml_cabala_out   = "/www/giji_log/cabala/rs/tag.pl"
      @rhtml_lobby_out    = "/www/giji_log/lobby/rs/tag.pl"

      print "  tag"

      File.open(@rhtml_src_testbed_out ,'w:sjis:utf-8'){|f| f.write( result ) }
      File.open(@rhtml_src_cabala_out  ,'w:sjis:utf-8'){|f| f.write( result ) }
      FileUtils.chmod( 0666, @rhtml_src_testbed_out )
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

  class CrsCreate < WebHtml
    # hiragana to katakana for utf-8
    def to_katakana(src)
      src
      .gsub("わ゙","ヷ")
      .gsub("い゙","ヸ")
      .gsub("え゙","ヹ")
      .gsub("を゙","ヺ")
      .tr("ぁ-ゖゝゞゟ","ァ-ヶヽヾヿ")
    end

    def activate( params )
      @csid   = params.csid
      @chrset = params.set
      @chrnpc = params.npc

      @chrnpc.say_0 = @chrnpc.say_0.gsub("\n","<br>").inspect
      @chrnpc.say_1 = @chrnpc.say_1.gsub("\n","<br>").inspect

      jobs  = params.chr_jobs
      job_groups = jobs.group_by(&:face_id)

      faces = params.faces.sort_by(&:order)
      faces.each do |face|
        face.q_name = to_katakana(face.name.gsub(/^[†Dr.]*/,""))
        job = job_groups[face.face_id].first
        [:job].each do |col|
          face[col] = job[col]
        end
      end

      @orders = faces.sort_by(&:order)
      @lists  = faces.sort_by(&:_id)
      @tag_names = {
        "all" => SOW_TAG.all.name
      }
      @chr_orders = {
        "all" => faces.map(&:face_id)
      }
      faces.each do |face|
        face.tag_ids.each do |tag_id|
          next unless SOW_TAG[tag_id]
          next unless SOW_TAG[tag_id].chr_set_ids.any? {|csid| @csid[csid] }
          @tag_names[tag_id]  ||= SOW_TAG[tag_id].name
          @chr_orders[tag_id] ||= []
          @chr_orders[tag_id].push face.face_id
        end
      end
      @tag_order = SOW_TAG.keys.select {|tag_id| @chr_orders[tag_id] }
      @tag_order.shift if @csid != "all"

      @chr_orders.each do |tag_id, list|
        @chr_orders[tag_id] =
          case SOW_TAG[tag_id][:face_sort][0]
          when 'face.order'
            faces.sort_by{|o| o.order }.map(&:face_id) & list
          when 'face.q.head'
            faces.sort_by{|o| o.q_name }.map(&:face_id) & list
          end
      end

      @rhtml_content = "./asset/sow/crs.pl.erb"
      result = to_s

      print "  #{@csid}"

      @rhtml_src_testbed_out = "/www/sow-giji/show-fix/rs/crs_" + @csid +".pl"
      @rhtml_src_angular_out = "/www/sow-giji/show-fix/rs/crs_" + @csid +".pl"
      @rhtml_src_cabala_out  = "/www/sow-giji/cabala/rs/crs_"   + @csid +".pl"

      @rhtml_testbed_out  = "/www/giji_log/testbed/rs/crs_"  + @csid +".pl"
      @rhtml_wolf_out     = "/www/giji_log/wolf/rs/crs_"     + @csid +".pl"
      @rhtml_ultimate_out = "/www/giji_log/ultimate/rs/crs_" + @csid +".pl"
      @rhtml_cabala_out   = "/www/giji_log/cabala/rs/crs_"   + @csid +".pl"
      @rhtml_lobby_out    = "/www/giji_log/lobby/rs/crs_"    + @csid +".pl"

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
