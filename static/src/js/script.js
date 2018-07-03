;(function() {
    'use strict';
    var website = openerp.website;
    website.openerp_website = {};
    website.add_template_file('/request_snippet/static/src/xml/form.xml');

    website.snippet.options.request_snippet_form_settings = website.snippet.Option.extend({
        drop_and_build_snippet() {
            let self = this;
            self.change_form_settings();
        },

        change_form_settings() {
            let self = this;
            self.$modal = $(openerp.qweb.render("request_snippet.form_for_snippet"));
            self.$modal.appendTo('body');
            self.$modal.modal();

            let partnersList;
            let $customHeaders = $('#custom-headers');
            let $table = self.$target.find('table').find('tbody');
            let $el_ids = $table.find('tr').find('td:first()');
            let arraySelectedElements = [];


            openerp.jsonRpc('/request/test/test_request', 'call', {}).then((respons) => {
                partnersList = $(respons.partners)

                multiSelectInitialization();
                add_elements_to_select();

                if( tableIsEmpty() != true ){
                    find_selected_elements();
                }
            });



            // =========== functions =============

            function tableIsEmpty(){
                if($table.find('tr').length != 0){
                    $el_ids.each((index) => {
                        arraySelectedElements.push($el_ids[index].textContent);
                    });
                    return false;

                }else{
                    return true;
                }
            }

            function add_elements_to_select(){
                partnersList.each((index, item) => {
                    $customHeaders.multiSelect('addOption', { value: item.id, text: item.name });
                });
            }

            function find_selected_elements(){
                $customHeaders.multiSelect('select', arraySelectedElements);
            }

            function multiSelectInitialization(){
                $customHeaders.multiSelect({

                    afterSelect(values) {
                        partnersList.each((index, item) => {
                            if (values == item.id){
                                $table.append('<tr><td>' 
                                    + item.id + '</td><td>' 
                                    + item.name + '</td><td>'
                                    + '<img src="http://0.0.0.0:8008/web/binary/image?model=res.partner&id=' + item.id + '&field=image_medium"/></td></tr>'
                                    // + `<img src="${self.location.origin}/web/binary/image?model=res.partner&id='${item.id}'&field=image_medium"/></td></tr>`
                                );
                            }
                        });
                    },

                    afterDeselect(values) {
                        let $el_list = $table.find('tr');
                        let $el_list_id = $el_list.find('td:first()');

                        for( var i = 0; i < $el_list_id.length;  i++ ){
                            if( values.indexOf( $($el_list_id[i]).text() ) != -1 ){
                                $($el_list_id[i]).parents('tr').remove(); 
                            }
                        }
                    }

                });
            }
        },

        start() {
            let self = this;
            this.$el.find(".js_form_settings").on("click", _.bind(this.change_form_settings, this));
            this._super();
        },
    
    
    });

    // TEST OPTION EDITOR
    website.snippet.options.next_form_settings = website.snippet.Option.extend({
        change_form_settings() {},
        start() {},
    });

})();