# jhu-auto-accession-numbers README

## Background

Plugin forked from Hudson Molonglo/Yale's <a href="https://github.com/hudmol/aspace_yale_accessions" title="aspace_yale_accessions">aspace_yale_accessions</a>.

JHU's desired modifications:

* Simplify to only account for two collection types - manuscripts (ms) and university archives (ua).
* Provide year span (2015-16) for first accession number part instead of single year.
* Truncate third part of accession number to 3 digits (down from 4).

## To install plugin:

   1. Stop the application
   2. Clone plugin into the archivesspace/plugins directory
   3. Modify `config.rb` (in archivesspace/config) to list jhu-auto-accession-numbers
   4. Run /archivesspace/scipts/setup-database.sh
   5. Restart the application /archivesspace/archivesspace.sh

# How it works

Users with "Manage Repository" permissions will see a new menu item in the
Repository settings menu (click the gear icon to the right of the selected
repository). Use the "Department Codes" setting to add and remove codes for
your Repository.

Department codes will appear in a dropdown for the second part of the Accession
identifier.

The first and third sections of the identifier will be system-generated upon
saving the record. The fourth section will be removed.


# Increasing sequence numbers

If you've imported existing records into the system, you may need to
manually set the sequence numbers for your records so that the
auto-generated IDs don't clash with existing ones.

Suppose you have a department code called 'ycal'.  You can insert a
new sequence starting from 100 for 2015 with some SQL:

     insert into sequence (sequence_name, value) values ('jhu_accession_2015_ycal', 100);

Or, if that sequence already exists, update it:

     update sequence set value = 100 where sequence_name = 'jhu_accession_2015_ycal';
