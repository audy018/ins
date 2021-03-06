$(function(){

    var products = {};

    products.modal = {
        show_history: function(){
            $('#mdl_service_history').modal({backdrop: 'static'}).show();
        },

        show_search_customer: function(){
            $('#mdl_search_customer').modal({backdrop: 'static'}).show();
        },

        hide_search_customer: function(){
            $('#mdl_search_customer').modal('hide');
        },

        show_search_supplier: function(){
            $('#mdl_search_supplier').modal({backdrop: 'static'}).show();
        },

        hide_search_supplier: function(){
            $('#mdl_search_supplier').modal('hide');
        }

    };

    products.ajax = {

        get_detail: function(product_code, cb){
            var url = '/products/detail',
                params = {
                    product_code: product_code
                };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },

        search_customer: function(query, cb){

            var url = '/products/search_customer',
                params = { query: query };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },

        search_supplier: function(query, cb){

            var url = '/products/search_supplier',
                params = { query: query };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },


        save: function(data, cb){

            var url = '/products/save',
                params = {
                    data: data
                };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });

        },

        remove: function(product_code, cb){
            var url = '/products/remove',
                params = { product_code: product_code };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null);
                }
            });
        },

        search: function(query, cb){
            var url = '/products/search',
                params = {
                    query: query
                };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },

        search_list: function(query, start, stop, cb){

            var url = '/products/search_list',
                params = {
                    query: query,
                    start: start,
                    stop: stop
                };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },

        service_history: function(id, cb){

            var url = '/reports/search_history',
                params = {
                    query: id
                };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },

        filter: function(type_code, customer_code, start, stop, cb){

            var url = '/products/search_filter',
                params = {
                    type_code: type_code,
                    customer_code: customer_code,
                    start: start,
                    stop: stop
                };

            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },

        filter_total: function(type_code, customer_code, cb){

            var url = '/products/search_filter_total',
                params = {
                    type_code: type_code,
                    customer_code: customer_code
                };
            App.ajax(url, params, function(err, data){
                if(err){
                    cb(err);
                }else{
                    cb(null, data);
                }
            });
        },

        get_list: function(start, stop, cb){

            var url = '/products/get_list',
                params = {
                    start: start,
                    stop: stop
                };

            App.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },

        get_list_total: function(cb){

            var url = '/products/get_list_total',
                params = {

                };

            App.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },

        search_total: function(query, cb){

            var url = '/products/search_total',
                params = {
                    query: query
                };

            App.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },

        get_model: function(brand_code, cb){

            var url = '/products/get_model_list_by_brand',
                params = {
                    brand_code: brand_code
                };

            App.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        }

    };

    products.set_model = function(brand_code, val){

        products.ajax.get_model(brand_code, function(err, data){

            if(err){
                App.alert(err);
            }else{

                $('#sl_model').empty();

                $('#sl_model').append('<option value="">-</option>');
                _.each(data.rows, function(v){
                    if(val == v.code){
                        $('#sl_model').append('<option value="' + v.code + '" selected="selected">' + v.name + '</option>');
                    }else{
                        $('#sl_model').append('<option value="' + v.code + '">' + v.name + '</option>');
                    }

                });
            }
        });
    };
    //clear register product form
    products.clear_register_form = function(){
        $('#txt_product_code').val('');
        $('#txt_product_serial').val('');
        $('#txt_purchase_price').val('');
        $('#txt_purchase_date').val('');
        $('#txt_customer_name').val('');
        $('#txt_customer_code').val('');
        $('#txt_supplier_name').val('');
        $('#txt_supplier_code').val('');
        $('#txt_isupdate').val('0');
        $('#txt_product_code').removeAttr('disabled');
        $('#txt_product_code').removeClass('uneditable-input');
        $('#txt_product_code').css('background-color', 'white');

        $('#sl_model').empty();
        App.set_first_selected($('#sl_brand'));
        App.set_first_selected($('#sl_type'));
        App.set_first_selected($('#sl_color'));
    };
    //set product detail
    products.set_product_detail = function(items){
        $('#txt_product_code').val(items.code);
        $('#txt_product_serial').val(items.product_serial);
        $('#txt_purchase_price').val(items.purchase_price);
        $('#txt_purchase_date').val(to_js_date(items.purchase_date));
        $('#sl_brand').val(items.brand_code);
        $('#sl_color').val(items.color_code);
        $('#txt_customer_code').val(items.customer_code);
        $('#txt_customer_name').val(items.customer_name);
        $('#sl_type').val(items.type_code);
        $('#txt_supplier_code').val(items.supplier_code);
        $('#txt_supplier_name').val(items.supplier_name);
        $('#txt_spec').val(items.spec);

        products.set_model(items.brand_code, items.model_code);

        $('#txt_product_code').attr('disabled', 'disabled').css('background-color', 'white');
        $('#txt_product_code').addClass('uneditable-input');
        $('#txt_isupdate').val('1');
    };


    products.set_list = function(data){
        $('#table_product_list tbody').empty();

        _.each(data.rows, function(v){
            var brand_name = v.brand_name == null ? '-' : v.brand_name;

            $('#table_product_list tbody').append(
                '<tr>' +
                    '<td>'+ v.product_code +'</td>' +
                    '<td>'+ v.type_name +'</td>' +
                    '<td>'+ v.brand_name +'</td>' +
                    '<td>'+ v.model_name +'</td>' +
                    '<td>'+ v.customer_name +'</td>' +
                    '<td>'+ to_thai_date(v.purchase_date) +'</td>' +
                    '<td>'+ count_age(v.purchase_date) +'</td>' +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<a href="javascript:void(0);" data-name="edit_product" ' +
                    'class="btn" data-code="'+ v.product_code +'" title="แก้ไข"> ' +
                    '<i class="icon-edit"></i></a> ' +
                    '<a href="javascript:void(0);" data-name="service_history" ' +
                    'class="btn" data-code="'+ v.product_code +'" title="ประวัติ"> ' +
                    '<i class="icon-time"></i></a> ' +
                    '<a href="javascript:void(0);" data-name="remove_product" ' +
                    'class="btn btn-danger" data-code="'+ v.product_code +'" title="ลบ"> ' +
                    '<i class="icon-trash"></i></a> ' +
                    '</div>' +
                    '</td>' +
                '</tr>'
            );
        });
    };
    //search filter
    products.do_filter = function(type_code, customer_code){

        $('#table_product_list tbody').empty();

		products.ajax.filter_total(type_code, customer_code, function(err, data){

	        if(err){
	            App.alert(err);
	            $('#table_product_list tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
	        }else{
	            $('#main_paging').paging(data.total, {
	                format: " < . (qq -) nnncnnn (- pp) . >",
	                perpage: App.record_perpage,
	                lapping: 1,
	                page: 1,
	                onSelect: function(page){
	                    //console.log('page: ' + page);
	                    //console.log(this.slice);      //this.slice[0] = start, this.slice[1] = stop

	                    products.ajax.filter(type_code, customer_code, this.slice[0], this.slice[1], function(err, data){
	                        if(err){
	                            App.alert(err);
	                            $('#table_product_list tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
	                        }else{
	                            products.set_list(data);
	                        }

	                    });

	                },
	                onFormat: function(type){
	                    switch (type) {

	                        case 'block':

	                            if (!this.active)
	                                return '<li class="disabled"><a href="">' + this.value + '</a></li>';
	                            else if (this.value != this.page)
	                                return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
	                            return '<li class="active"><a href="#">' + this.value + '</a></li>';

	                        case 'right':
	                        case 'left':

	                            if (!this.active) {
	                                return "";
	                            }
	                            return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';

	                        case 'next':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&raquo;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&raquo;</a></li>';

	                        case 'prev':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&laquo;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&laquo;</a></li>';

	                        case 'first':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&lt;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&lt;</a></li>';

	                        case 'last':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&gt;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&gt;</a></li>';

	                        case 'fill':
	                            if (this.active) {
	                                return '<li class="disabled"><a href="#">...</a></li>';
	                            }
	                    }
	                    return ""; // return nothing for missing branches
	                }
	            });
	        }
	    });
	};

    products.do_get_list = function(){

        $('#table_product_list tbody').empty();

		products.ajax.get_list_total(function(err, data){

	        if(err){
	            App.alert(err);
	            $('#table_product_list tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
	        }else{
	            $('#main_paging').paging(data.total, {
	                format: " < . (qq -) nnncnnn (- pp) . >",
	                perpage: App.record_perpage,
	                lapping: 1,
	                page: 1,
	                onSelect: function(page){
	                    //console.log('page: ' + page);
	                    //console.log(this.slice);      //this.slice[0] = start, this.slice[1] = stop

	                    products.ajax.get_list(this.slice[0], this.slice[1], function(err, data){
	                        if(err){
	                            App.alert(err);

	                            $('#table_product_list tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
	                        }else{
	                            products.set_list(data);
	                        }

	                    });

	                },
	                onFormat: function(type){
	                    switch (type) {

	                        case 'block':

	                            if (!this.active)
	                                return '<li class="disabled"><a href="">' + this.value + '</a></li>';
	                            else if (this.value != this.page)
	                                return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
	                            return '<li class="active"><a href="#">' + this.value + '</a></li>';

	                        case 'right':
	                        case 'left':

	                            if (!this.active) {
	                                return "";
	                            }
	                            return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';

	                        case 'next':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&raquo;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&raquo;</a></li>';

	                        case 'prev':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&laquo;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&laquo;</a></li>';

	                        case 'first':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&lt;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&lt;</a></li>';

	                        case 'last':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&gt;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&gt;</a></li>';

	                        case 'fill':
	                            if (this.active) {
	                                return '<li class="disabled"><a href="#">...</a></li>';
	                            }
	                    }
	                    return ""; // return nothing for missing branches
	                }
	            });
	        }
	    });
	};

    products.do_search = function(query){

        $('#table_product_list tbody').empty();

		products.ajax.search_total(query, function(err, data){

	        if(err){
	            App.alert(err);
	            $('#table_product_list tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
	        }else{
	            $('#main_paging').paging(data.total, {
	                format: " < . (qq -) nnncnnn (- pp) . >",
	                perpage: App.record_perpage,
	                lapping: 1,
	                page: 1,
	                onSelect: function(page){
	                    //console.log('page: ' + page);
	                    //console.log(this.slice);      //this.slice[0] = start, this.slice[1] = stop

	                    products.ajax.search_list(query, this.slice[0], this.slice[1], function(err, data){
	                        if(err){
	                            App.alert(err);
	                            $('#table_product_list tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
	                        }else{
	                            products.set_list(data);
	                        }

	                    });

	                },
	                onFormat: function(type){
	                    switch (type) {

	                        case 'block':

	                            if (!this.active)
	                                return '<li class="disabled"><a href="">' + this.value + '</a></li>';
	                            else if (this.value != this.page)
	                                return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
	                            return '<li class="active"><a href="#">' + this.value + '</a></li>';

	                        case 'right':
	                        case 'left':

	                            if (!this.active) {
	                                return "";
	                            }
	                            return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';

	                        case 'next':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&raquo;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&raquo;</a></li>';

	                        case 'prev':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&laquo;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&laquo;</a></li>';

	                        case 'first':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&lt;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&lt;</a></li>';

	                        case 'last':

	                            if (this.active) {
	                                return '<li><a href="#' + this.value + '">&gt;</a></li>';
	                            }
	                            return '<li class="disabled"><a href="">&gt;</a></li>';

	                        case 'fill':
	                            if (this.active) {
	                                return '<li class="disabled"><a href="#">...</a></li>';
	                            }
	                    }
	                    return ""; // return nothing for missing branches
	                }
	            });
	        }
	    });
	};


    $('#btn_search_product').click(function(){
        var query = $('#txt_query_product').val();

        if(!query){
            App.alert('กรุณากรอกคำที่ต้องการค้นหา');
        }else{
           products.do_search(query);
        }
    });

    $('#btn_do_filter').click(function(){
        var customer_code = $('#txt_filter_customer_code').val(),
            type_code = $('#sl_filter_type').val();

        products.do_filter(type_code, customer_code);
    });

    //register new product
    $('#btn_do_register').click(function(){
        var params = {};

        params.code = $('#txt_product_code').val();
        params.product_serial = $('#txt_product_serial').val();
        params.purchase_price = $('#txt_purchase_price').val();
        params.purchase_date = to_mysql_date($('#txt_purchase_date').val());
        params.brand_code = $('#sl_brand').val();
        params.model_code = $('#sl_model').val();
        params.customer_code = $('#txt_customer_code').val();
        params.type_code = $('#sl_type').val();
        params.color_code = $('#sl_color').val();
        params.supplier_code = $('#txt_supplier_code').val();
        params.spec = $('#txt_spec').val();
        params.isupdate = $('#txt_isupdate').val();

        if(!params.customer_code){
            App.alert('กรุณาระบุข้อมูลหน่วยงาน/ร้านค้า');
        }else if(!params.type_code){
            App.alert('กรุณาระบุชนิดของสินค้า');
        }else if(!params.brand_code){
            App.alert('กรุณาระบุยี่ห้อของสินค้า');
        }else{
            products.ajax.save(params, function(err, data){
                if(err){
                    App.alert(err);
                }else{
                    App.alert('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                    //clear form
                    products.clear_register_form();
                    $('#tab_main').tab('show');

                    products.do_get_list();
                }
            });
        }
    });

    //click for edit product
    $('a[data-name="edit_product"]').live('click', function(){
        var product_code = $(this).attr('data-code');
        //get product detail
        products.ajax.get_detail(product_code, function(err, data){
            if(err){
                App.alert(err);
            }else{

                products.set_product_detail(data.rows);

                $('#tab_new_edit_product').tab('show');
            }
        });
    });

    //remove product
    $('a[data-name="remove_product"]').live('click', function(){
        var product_code = $(this).attr('data-code');

        //a.div.td.tr
        var t = $(this).parent().parent().parent();

        if(confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')){
            products.ajax.remove(product_code, function(err){
                if(err){
                    App.alert(err);
                }else{
                    //remove row
                    App.alert('ลบรายการเสร็จเรียบร้อยแล้ว');
                    $(t).fadeOut('slow');
                }
            });
        }
    });

    //get service history
    $('a[data-name="service_history"]').live('click', function(e){

        e.preventDefault();
    	var id = $(this).attr('data-code');
    	products.ajax.service_history(id, function(err, data){

	        if(err){
	        	App.alert(err);
	        }else{
	        	$('#tbl_service_history > tbody').empty();
	        	if(_.size(data.rows)){
	        		_.each(data.rows, function(v){
		        		$('#tbl_service_history > tbody').append(
		        			'<tr>' +
		        			'<td>' + v.date_serv + '</td>' +
		        			'<td>' + v.service_code + '</td>' +
		        			'<td>' + v.cause + '</td>' +
		        			'<td>' + v.technician_name + '</td>' +
		        			'<td>' + v.service_status + '</td>' +
		        			'</tr>'
		        		);
		        	});
	        	}else{
	        		$('#tbl_service_history > tbody').append(
		        			'<tr>' +
		        			'<td colspan="5">ไม่พบรายการ</td>' +
		        			'</tr>'
		        		);
	        	}

	        	products.modal.show_history();
	        }
    	});
    });

    $('#btn_get_all').click(function(){
    	products.do_get_list();
    });

    $('#sl_brand').on('change', function(){
        var brand_code = $(this).val();
        products.set_model(brand_code);
    });

    $('#btn_search_customer').click(function(){
    $('#txt_customer_search_by').val('1');
        products.modal.show_search_customer();
    });

    $('#btn_search_supplier').click(function(){
        products.modal.show_search_supplier();
    });

    $('#btn_do_search_customer').click(function(){
        var query = $('#txt_query_customer').val();

        if(!query){
            App.alert('กรุณาระบุคำที่ต้องการค้นหา...');
        }else{
            products.ajax.search_customer(query, function(err, data){
                $('#tbl_customer_result_list > tbody').empty();
                if(err){
                    App.alert(err);
                }else{

                    _.each(data.rows, function(v){
                        $('#tbl_customer_result_list > tbody').append(
                            '<tr>' +
                                '<td>' + v.code + '</td>' +
                                '<td>' + v.name + '</td>' +
                                '<td><a href="javascript:void(0);" ' +
                                'data-name="btn_selected_customer" ' +
                                'data-code="'+ v.code +'" ' +
                                'data-vname="'+ v.name +'" ' +
                                'class="btn" title="เลือกรายการ"><i class="icon-share"></i></a></td>' +
                            '</tr>'
                        );
                    });
                }
            });
        }
    });

    $('#btn_do_search_supplier').click(function(){
        var query = $('#txt_query_supplier').val();

        if(!query){
            App.alert('กรุณาระบุคำที่ต้องการค้นหา...');
        }else{
            products.ajax.search_supplier(query, function(err, data){
                $('#tbl_supplier_result_list > tbody').empty();
                if(err){
                    App.alert(err);

                }else{

                    _.each(data.rows, function(v){
                        $('#tbl_supplier_result_list > tbody').append(
                            '<tr>' +
                                '<td>' + v.code + '</td>' +
                                '<td>' + v.name + '</td>' +
                                '<td><a href="javascript:void(0);" ' +
                                'data-name="btn_selected_supplier" ' +
                                'data-code="'+ v.code +'" ' +
                                'data-vname="'+ v.name +'" ' +
                                'class="btn" title="เลือกรายการ"><i class="icon-share"></i></a></td>' +
                            '</tr>'
                        );
                    });
                }
            });
        }
    });

    //selected customer
    $('a[data-name="btn_selected_customer"]').live('click', function(){
        var code = $(this).attr('data-code'),
            vname = $(this).attr('data-vname'),
            by = $('#txt_customer_search_by').val();

        if(by == '0'){
            $('#txt_filter_customer_code').val(code);
            $('#txt_filter_customer_name').val(vname);
        }else{
            $('#txt_customer_code').val(code);
            $('#txt_customer_name').val(vname);
        }

        products.modal.hide_search_customer();
    });

    //selected supplier
    $('a[data-name="btn_selected_supplier"]').live('click', function(){
        var code = $(this).attr('data-code'),
            vname = $(this).attr('data-vname');

        $('#txt_supplier_code').val(code);
        $('#txt_supplier_name').val(vname);

        products.modal.hide_search_supplier();
    });

    $('#tab_main').click(function(){
        products.clear_register_form();
    });

    $('#btn_search_filter_customer').click(function(){
        $('#txt_customer_search_by').val('0');
        products.modal.show_search_customer();
    });

    $('a[data-name="btn_print_all"]').on('click', function(){
        App.goto_url('/prints/product_all');
    });

    $('a[data-name="btn_print_filter"]').on('click', function(){

        var customer_code = $('#txt_filter_customer_code').val(),
            type_code = $('#sl_filter_type').val();

        if(!customer_code)
        {
            App.alert('กรุณาระบุข้อมูลหน่วยงาน/ลูกค้า');
        }
        else
        {
            App.goto_url('/prints/product_filter/' + customer_code + '/' + type_code);
        }

    });

    products.do_get_list();
});
