
jQuery('.print').on('click', function () {

    if (jQuery(this).val() == 0) {
        alert('Please Use Print All Labels');
        return false;
    }

    else {
        // TODO: clean this up
        var storecode = jQuery('#storecode').val();
        var id = jQuery(this).parent().parent().attr('data-id');
        var isLarge = jQuery(this).data('islarge') ? 'Large' : '';
        if (typeof jQuery('input[name=cards\\[' + id + '\\]\\[info\\]\\[face_value\\]]').val() !== "undefined") {
            PrintLabel([
                {
                    merchants_name:jQuery('input[name=merchant-name\\[' + id + '\\]]').val(),
                    card_order_card_id:storecode + id,
                    filling_id:jQuery(this).val()+ ' ' + isLarge,
                    face_value:jQuery('input[name=cards\\[' + id + '\\]\\[info\\]\\[face_value\\]]').val()
                }
            ]);
        }
        else {
            var parent = jQuery(this).closest('tr');
            PrintLabel([
                {
                    merchants_name:parent.find('input.merchants-name').val(),
                    card_order_card_id:storecode + id,
                    filling_id:jQuery(this).val()+ ' ' + isLarge,
                    face_value:parent.find('input.face-value').val()
                }
            ]);
        }
        return false;
    }
});



jQuery("#print-label").click(function () {

    // Check FillingBox and Prepaid
    CheckFillingBoxAndPrepaid();


    // Set  Array
    var Cards = [];



    // Set Object Array
    jQuery("#order-cards tr.cards").each(function () {

        Cards.push(PrepareCard(this));

    });

    console.log(Cards);

    PrintLabel(Cards);
});

jQuery("#set-label").click(function () {

    // Check FillingBox and Prepaid
    CheckFillingBoxAndPrepaid();


    // Set  Array
    var Cards = [];



    // Set Object Array
    jQuery("#order-cards tr.cards").each(function () {

        Cards.push(PrepareCard(this));

    });

    console.log(Cards);
 
});

function PrepareCard (el)
{

    var Card = [];
    var isLarge = jQuery(el).find('.filling-id').data('islarge') ? 'Large' : '';
    var storecode = jQuery('#storecode').val();

    Card['merchants_name'] = jQuery(el).find('.merchants-name').val();
    Card['card_order_card_id'] = storecode + jQuery(el).attr('data-id');
    Card['filling_id'] = jQuery(el).find('.filling-id').val();
    Card['face_value'] = jQuery(el).find('.face-value').val();

    console.log(Card);



    if (Card['filling_id'] == 0) {

        Card['filling_id'] = SetFillingID(jQuery(el).attr('data-id')) + ' ' + isLarge;
        if (Card['filling_id'] == 0 || Card['filling_id'] == undefined) {
            alert ("Some Cards Not Set, Please Retry.");
            exit('Not Found');
        }
        return Card;

    }

    else {
        Card['filling_id'] =  Card['filling_id'] + ' ' + isLarge;
       return Card;

    }

}


function SetFillingID(CardID) {
    var FillingID;
        $.ajax({
            url:'ri.php/ricard/admin_ajax_filling_process/',
            dataType:'json',
            type:'post',
            async: false,
            data:{'card_order_card_id':CardID, 'fillingbox':jQuery('#fillingbox').val()},
            success:function (response, statusText, xhr, $form) {
                jQuery.each(response, function (i, v) {
                    SetCardHTML(v);
                    FillingID = v.filling_id + v.fillingbox;
                });

            }
        });

    return FillingID;

}


function SetCardHTML (v)
{

    jQuery('button[name=print_' + v.card_order_card_id + ']').val(v.filling_id + v.fillingbox);
    jQuery('button[name=print_' + v.card_order_card_id + ']').html(v.filling_id + v.fillingbox);

}

function CheckFillingBoxAndPrepaid () {

    if (jQuery('#fillingbox').val() == 0) {
        alert('Please Select Filled By');
        exit();
    }
    if (jQuery('input[name=prepaid]').val() == '1') {
        alert('Turn Prepaid Off First');
        exit();
    }
    if(jQuery('input[name="info[date_added]"]').val() == ''){
        jQuery.ajax({
            url:'ri.php/ricard/ajax_save_date_added/',
            dataType:'json',
            type:'post',
            async: false,
            data:{'sell_order_id':jQuery('#hidden_order').data('orderid')},
            success:function (response) {
                jQuery('input[name="info[date_added]"]').val(response.date_added);
                return true;
            }
        });
    }
}







