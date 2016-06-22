require_relative 'mixins/accession_id_generator.rb'

Accession.class_eval do
  include JHUAccessionIdGenerator
end


Accession.properties_to_auto_generate.push ({
  :property => :id_1,
  :generator => JHUAccessionIdGenerator.id_1_generator,
  :only_if => proc {|json| !JHUAccessionIdGenerator.inside_import? && json[:id_0] =~ /import/ }
})



Accession.properties_to_auto_generate.push ({
  :property => :id_0,
  :generator => JHUAccessionIdGenerator.id_0_generator,
  :only_if => proc { true }
})


Accession.properties_to_auto_generate.push ({
  :property => :id_2,
  :generator => JHUAccessionIdGenerator.id_2_generator,
  :only_if => proc {|json| !JHUAccessionIdGenerator.inside_import? && json[:id_2].nil? && !json[:id_1].nil? }
})
