console.log("poprequest loaded")


function popRequest(poptype,from) {
    if ($(".popRequest").length <= 0) {
        switch (poptype) {
        case "trade":
            var popframe = '<div class="popRequest"><div class="popRequest_type">交易请求</div><div class="popRequest_from">'+from+'</div><div class="popRequest_timer"><div class="popRequest_prograss"></div></div><div class="popRequest_response"><div class="popRequest_response_yes">Yes</div><div class="popRequest_response_no">No</div></div></div>'

            $('#IGUI').append(popframe);


            break;

        }

        var time = 0;
        function rd(time) {
            if ($(".popRequest").length<=0)
            {
                window.clearTimeout(poptimer)
                return;
            }
            if (time < 20) {

                //console.log(time)
                $(".popRequest_prograss").width(time / 20 * 100 + "%");
                time++;
                
              var poptimer=window.setTimeout(function () {
                    rd(time)
                }, 1000)
            } else {
                $(".popRequest").remove();
                window.clearTimeout(poptimer)
                return;
            }
            return
        }
        rd(time);
    }





}

$('body').on("click", ".popRequest_response_yes", function () {
    
    switch($(".popRequest_type").text())
    {
        case "交易请求":
            responseRequest("trade","yes");
            $(".popRequest").remove();
        break;
    }
})
$('body').on("click", ".popRequest_response_no", function () {
    
    switch($(".popRequest_type").text())
    {
        case "交易请求":
            responseRequest("trade","deny_trade_request");
            $(".popRequest").remove();
        break;
    }
})
