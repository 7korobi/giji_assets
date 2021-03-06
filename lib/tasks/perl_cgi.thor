# -*- coding: utf-8 -*-

class PerlCgi < Thor
  desc "init", "push files initial to server"
  def init(folder)
    files = %w[index.html sow.cgi] + (0..9).map{|d| "sow#{d}.cgi"}
    sync_to_servers(files) do |folder, files|
      next if files['skip']
      files && files['lapp'] && files['lapp'][/show-fix$/]
    end
  end

  desc "push_only", "push files to other servers"
  def push_only(*folders)
    sync_to_servers do |folder, files|
      folders.include? folder
    end

    files = %w[index.html sow.cgi] + (0..9).map{|d| "sow#{d}.cgi"}
    sync_to_servers(files) do |folder, files|
      folders.include? folder
    end
  end

  desc "push", "push files to other servers"
  def push
    sync_to_servers{|folder, files| true }
  end

  desc "cabala", "push files to cabala servers"
  def cabala
    files = %w[index.html sow.cgi]
    sync_to_servers(files) do |folder, files|
      next if files['skip']
      files && files['lapp'] && files['lapp'][/cabala$/]
    end
  end

  desc "angular", "push files to angular servers"
  def angular
    files = %w[index.html sow.cgi]
    sync_to_servers(files) do |folder, files|
      next if files['skip']
      files && files['lapp'] && files['lapp'][/show-fix$/]
    end
  end

  desc "test", "push files to testbed servers"
  def test
    files = %w[index.html sow.cgi]
    sync_to_servers(files) do |folder, files|
      next if files['skip']
      files && files['lapp'] && files['lapp'][/show-fix$/]
    end
  end

  desc "apache", "push .htaccess files to all servers"
  def apache
    files = %w[.htaccess]
    sync_to_servers(files) do |folder, files|
      next if files['skip']
      folder != "LOBBY"
    end
  end

  def sync_to_servers(files = [])
    require './config/environment'
    require './lib/rsync'
    require 'erubis'
    require 'fileutils'
    require 'yaml'

    rsync = Giji::RSync.new
    rsync.each do |folder, protocol, set|
      next unless yield(folder, set['files'])

      files.each do |fname|
        rsync.put(protocol, set, fname, :lapp, :app)
      end
      rsync.put(protocol, set, 'html/', :lapp, :app)
      rsync.put(protocol, set, 'lib/',  :lapp, :app)
      rsync.put(protocol, set, 'rs/',   :lapp, :app)
    end

    rsync.exec
  end
end

