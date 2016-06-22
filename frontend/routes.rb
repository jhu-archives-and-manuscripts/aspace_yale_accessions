ArchivesSpace::Application.routes.draw do
  match 'plugins/jhu_accessions/department_codes' => 'jhu_accessions#department_list', :via => [:get]
  match 'plugins/jhu_accessions/department_codes' => 'jhu_accessions#department_list_update', :via => [:post]
end
