lock '3.3.5'

set :application, "giji_assets"
set :org, "7korobi"

### multistage settings
set :stage_dir, "config/deploy"

# shared link
set :linked_files, []
set :linked_dirs, []

###
### shared settings
###
set :use_sudo, false
set(:ssh_options,
  user: '7korobi',
  keys: [File.expand_path('~/.ssh/id_rsa')],
  forward_agent: true,
  auth_methods: %w(publickey)
)

set :format, :utage
set :log_level, :debug
