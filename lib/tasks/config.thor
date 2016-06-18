# -*- coding: utf-8 -*-

class Config < Thor
  desc "create", "create config to other server"
  def create
    require './config/environment'
    require './lib/rsync'
    require 'erubis'
    require 'fileutils'
    require 'yaml'

    ConfigCreate.new.activate{|files| true }
  end

  desc "test", "create config to other server"
  def test
    require './config/environment'
    require './lib/rsync'
    require 'erubis'
    require 'fileutils'
    require 'yaml'

    ConfigCreate.new.activate do |files|
      files && ! files['skip'] && files['lapp'] && files['lapp'][/show-fix$/]
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


  class ConfigCreate < WebHtml
    def activate( params = {} )
      @params = params

      @cfg_order = [
        :USERID_NPC     ,
        :USERID_ADMIN   ,
        :ENABLED_VMAKE  ,
        :URL_SW         ,
        :NAME_HOME      ,
        :RULE           ,
        :TYPE           ,
        :MAX_VILLAGES   ,
        :TIMEOUT_SCRAP  ,
        :TIMEOUT_ENTRY  ,
        :TOPPAGE_INFO   ,
        :BASEDIR_CGIERR ,
        :BASEDIR_CGI    ,
        :BASEDIR_DAT    ,
        :BASEDIR_DOC    ,
      ]
      @enable_order = [
        :ENABLED_DELETED      ,
        :ENABLED_WINNER_LABEL ,

        :ENABLED_MAX_ESAY     ,
        :ENABLED_RANDOMTARGET ,
        :ENABLED_SUDDENDEATH  ,

        :ENABLED_BITTY        ,
        :ENABLED_PERMIT_DEAD  ,
        :ENABLED_UNDEAD       ,

        :ENABLED_AIMING       ,
        :ENABLED_MOB_AIMING   ,

        :ENABLED_AMBIDEXTER   ,
        :ENABLED_SUICIDE_VOTE ,
        :DEFAULT_VOTETYPE     ,
      ]
      @maxsize_order = [
        :MAXSIZE_ACTION   ,
        :MAXSIZE_MEMOCNT  ,
        :MAXSIZE_MEMOLINE ,
      ]


      result  = {}

      rhtml_info_out = "/www/giji_log/sow/_info.pl"
      @rhtml_content = "./asset/sow/_info.pl.erb"
      File.open(rhtml_info_out ,'w:sjis:utf-8'){|f| f.write( to_s ) }
      FileUtils.chmod( 0666, rhtml_info_out )

      @perl_change = -> s { s.to_s.gsub(/[—ソЫⅨ㎇噂浬欺圭構蚕十申曾箪貼能表暴予禄兔喀媾彌拿杤歃濬畚秉綵臀藹觸軆鐔饅鷭偆砡纊犾](?!\\)/){ $& + '\\' }}

      CONF_FOLDER.each_pair do |folder,cfg|
        config           = cfg['config']                || next
        rhtml_config_out = config['pl']                 || next
        chk_rp           = cfg.dig 'story', 'role_play' || next
        p folder
        p cfg['story']

        @rhtml_content,@maxsize,@saycnt_orders,@games,@csids,@trsids,@path,@cfg,@enable,@is_angular = [config['erb'], config['maxsize'], config['saycnt'], config['game'], config['csid'], config['trsid'], config['path'], config['cfg'], config['enable'], config['is_angular']]
        @saycnt_data = @saycnt_orders.map do |name|
          data = CONF_SAY[name]
          data = CONF_SAY["#{name}_braid"] if chk_rp
          txt = "my %saycnt_#{name} = (\n"
          data.each do |key, val|
            txt += "#{key} => #{val.inspect},\n"
          end
          txt += ");\n\n"
          txt
        end
        @ratings = CONF_RATING
        @ratings[:default][:alt] = config['cd_default']
        @rating_list = @ratings.keys() - ['alert']

        result[folder] = to_s

        `mkdir -p #{rhtml_config_out}`
        `rmdir    #{rhtml_config_out}`
        File.open(rhtml_config_out ,'w:sjis:utf-8'){|f| f.write( result[folder] ) }
        FileUtils.chmod( 0666, rhtml_config_out )
      end

      rsync = Giji::RSync.new
      rsync.each do |folder, protocol, set|
        next unless yield(set['files'])
        rsync.put(protocol, set, '_info.pl', :lsow, :config)
      end

      rsync.each do |folder, protocol, set|
        next unless CONF_FOLDER[folder]  &&  CONF_FOLDER[folder][:config]
        next unless yield(set['files'])
        rhtml_config_out = CONF_FOLDER[folder][:config][:pl]
        rsync.put(protocol, set, 'config.pl', :ldata, :config)
      end

      rsync.exec
    end
  end
end
