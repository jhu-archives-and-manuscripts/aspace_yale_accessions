function AccessionIdentifiers(new_record) {
    this.ids = $('div.identifier-fields');
    this.id_0 = $('#accession_id_0_');
    this.id_2 = $('#accession_id_2_');

    this.new_record = new_record;
}


AccessionIdentifiers.prototype.disable = function($field) {
    $field.attr('readonly', 'readonly');
    $field.attr('tabindex', '-1');
    $field.on("focus", function(e) {
        $(this).blur();
        e.stopPropagation();
    });

    $field.on("change", function(e) {
        e.stopPropagation();
    });
}


AccessionIdentifiers.prototype.init = function () {
    var self = this;

    if (self.new_record) {
        self.ids.removeClass('required');
        self.disable(self.id_0);
        self.disable(self.id_2);

        if (!self.id_0.val().length) {
            self.id_0.val('YYYY-YY');
        }

        if (!self.id_2.val().length) {
            self.id_2.val('XXX');
        }

    }


    $('#accession_id_3_').hide();
    self.load_department_codes();
};


AccessionIdentifiers.prototype.load_department_codes = function () {
    $.ajax({
        url: APP_PATH + "plugins/jhu_accessions/department_codes",
        data: {},
        dataType: 'json',
        type: "GET",
        success: function(department_list) {
            var codes = department_list.codes;
            var current_code = $('#accession_id_1_').val();

            // Deprecated department codes
            if (current_code.length && $.inArray(current_code, codes) < 0) {
                codes.push(false);
                codes.push(current_code);
            }

            if (codes.length > 1) {
                var html = "<select id=\"accession_id_1_\" name=\"accession[id_1]\">";
                $.each(codes, function(i, code) {
                    if (code == current_code) {
                        html += "<option value=\"" + code + "\" selected=\"selected\">" + code + "</option>";
                    } else if (code == false) {
                        html += "<option disabled>&#9472;</option>";
                    } else {
                        html += "<option value=\"" + code + "\">" + code + "</option>";
                    }

                });

                html += "</select>"
                $('#accession_id_1_').replaceWith(html);
            } else if (codes.length == 1) {
                $('#accession_id_1_').val(codes[0]);
                $('#accession_id_1_').removeAttr('disabled');
                self.disable($('#accession_id_1_'));
            } else {
                $('#accession_id_1_').attr('disabled', 'disabled');
            }
        },
    });
};
