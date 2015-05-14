/**
 * Created by lomak_000 on 20.04.2015.
 */

function dataValid(data){
    try { var parsedString=JSON.parse(data); }
    catch (e) {
        if(data=='') return false;
        //else showAlert(msg)
        else alert(data);
        //production mode
        //else {} //working mode
        return false;
    };
    if(parsedString.status == "ok"){
        data = parsedString;
        return data;
    }
}
/*Блок календаря*/
var countID = 0;
function renderCalendar(h, arr) {
    var type = 'month',
        dateFix = 0, monthFix = 0, yearFix = 0;
    /*Перевод дней и месяцев для маленького календаря*/
    var dayNameRu = function(aName){
        switch (aName){
            case "Sun":return "воскресенье"
            case "Mon":return "понедельник"
            case "Tue":return "вторник"
            case "Wed":return "среда"
            case "Thu":return "четверг"
            case "Fri":return "пятница"
            case "Sat":return "суббота"
        }
    }
    var monthNameRu = function(aMonth){
        switch (aMonth){
            case "January":return "январь"
            case "February":return "февраль"
            case "March":return "март"
            case "April":return "апрель"
            case "May":return "май"
            case "June":return "июнь"
            case "July":return "июль"
            case "August":return "август"
            case "September":return "сентябрь"
            case "October":return "октябрь"
            case "November":return "ноябрь"
            case "December":return "декабрь"
        }
    }
    /*---*/
    /*Обьявляем маленький календарь*/
    $("#small-calendar").datetimepicker({
        lang: "ru",
        i18n: {
            ru: {
                months: [
                    'январь', 'февраль', 'март', 'апрель',
                    'май', 'июнь', 'июль', 'август',
                    'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
                ]
            }
        },
        todayButton: false,
        scrollMonth: false,
        dayOfWeekStart: 1,
        inline: true,
        format: 'd.m.Y ',
        timepicker: false,
        onSelectDate:function(date) {
            dateFix = date.dateFormat("d");
            monthFix = date.dateFormat("m") - 1; //-1 нужен потому что в datetimepicker месяца начинаются с 0 и до 11
            yearFix = date.dateFormat("Y");
        },
        onGenerate: function (date) {
            if (dateFix == 0) {
                dateFix = date.dateFormat("d");
                monthFix = date.dateFormat("m");
                monthFix--;  //-1 нужен потому что в datetimepicker месяца начинаются с 0 и до 11
                yearFix = date.dateFormat("Y");
            }
            var _this = this;
            switch (type) {
                case "month":
                    _this.find("tbody").addClass("active_month");
                    _this.find("tbody td").click(function () {
                        type = "week";
                        $(".week").addClass('active').siblings().removeClass("active");
                    });
                    var todayMonth = _this.find(".xdsoft_today").data("month"),
                        currMonth = _this.find(".xdsoft_current").data("month");
                    if (currMonth != todayMonth) {
                        _this.find(".xdsoft_current").removeClass("xdsoft_current")
                    }
                break;
                case "week":
                    _this.find(".xdsoft_current").closest("tr").addClass("active_week");
                    $('#calendar').fullCalendar('changeView', 'agendaWeek');
                    $("#calendar").fullCalendar('gotoDate', date);
                    $('.fc-agendaWeek-view .fc-day-header').each(function () {
                        var dayName = $(this).html();
                        //Разбиваем строку и ставим ей такой вид как в макете
                        if (!$(this).hasClass("yes")) {
                            var sp = dayName.split("<br>");
                            $(this).html("<div>" + sp[0] + "</div>" + sp[1])
                            $(this).addClass("yes")
                        }
                        //-------
                    });
                    _this.find("tbody tr.active_week td").click(function () {
                        type = "day";
                        $(".day").addClass('active').siblings().removeClass("active");
                    });
                    $('.fc-agendaWeek-view .fc-body .fc-scroller, .fc-agendaDay-view .fc-body .fc-scroller').css("overflow", "hidden").mCustomScrollbar('scrollTo','35%');
                break;
                case "day":
                    $('#calendar').fullCalendar('changeView', 'agendaDay');
                    $("#calendar").fullCalendar('gotoDate', date);
                    var text = $('.fc-agendaDay-view .fc-day-header').text();
                    $('.fc-agendaDay-view .fc-day-header').html("<span>" + text + "</span>").prepend("<i class='icon-left-arrow-fully prev'></i>").append("<i class='icon-right-arrow-fully next'></i>");
                    $('.fc-agendaWeek-view .fc-body .fc-scroller, .fc-agendaDay-view .fc-body .fc-scroller').css("overflow", "hidden").mCustomScrollbar('scrollTo','35%');
                break;
            }
            $(".controls .date span:first-child").text(dayNameRu(date.dateFormat("D")))
            $(".controls .date span:last-child").text(date.dateFormat("d")+" "+ monthNameRu(date.dateFormat("F"))+" "+date.dateFormat("Y"))
        }
    });
    //Функция определения высокоссного года
    var IsLeapYear = function(aYear){
        return((((aYear%4==0)) || (aYear%400==0)) ? true : false);
    }
    /*---*/
    /*Обьявляем большой календарь*/
    $('#calendar').fullCalendar({
        header: false,
        views: {
            week: {
                columnFormat: "dddd \n D MMM"
            },
            day: {
                columnFormat: "dddd D.M.YYYY"
            }
        },
        //defaultDate: '2015-02-12',
        lang: "ru",
        eventRender: function (event) {
            countID = event.id+1;
        },
        height: h,
        buttonIcons: false, // show the prev/next text
        weekNumbers: false,
        eventColor: "transparent",
        eventBackgroundColor: "#eda5c9",
        editable: true,
        //allDaySlot: false,
        dayClick: function (date, jsEvent, view) {
            var _this = $(this);
            //если у нас уже есть содержимое тогда его удаляем т.к. при любых мы его создаем
            if ($(this).find(".addNewTask").length != 0) {
                $(this).find(".addNewTask").remove();
            }

            //Сначала создаём всё содержимое которое нам нужно в тултипе
            $(this).append("<form class='addNewTask' style='display: none'></form>");
            var newTaskBlock = $(this).find(".addNewTask")
            newTaskBlock.append("<i class='icon-cancel'></i>");
            //newTaskBlock.find(".icon-cancel");
            newTaskBlock.append("<div class='timeTask'><span>Дата выполнения: </span>" + date.format('llll') + "</div>");
            newTaskBlock.append("<div class='event'>Название: <input type='text' name='title' /></div>");
            newTaskBlock.append("<div class='buttons'></div>");
            var buttons = newTaskBlock.find(".buttons");
            buttons.append("<button class='cab-btn' type='submit'>Создать задачу</button>");

            //Вызываем тултип
            $(this).qtip({
                show: {
                    when: {date: 'click'},
                    solo: true,
                    ready: true
                },
                hide: {
                    fixed: false,
                    delay: 100,
                    leave: false,
                    target: $(this).find('form .icon-cancel'),
                    event: 'click'
                },
                position: {
                    my: 'bottom center',
                    at: 'top center',
                    target: [jsEvent.pageX, jsEvent.pageY],
                    viewport: $(window)
                },
                style: {
                    classes: 'lom_tool qtip-shadow-lom qtip-light qtip-shadow',
                    width: 305,
                    tip: {
                        corner: true,
                        width: 21
                    }

                },
                content: {
                    prerender: true,
                    text: function (event, api) {
                        return $(this).find(".addNewTask").clone();
                    }
                },
                events: {
                    hide: function (event, api) {
                        // Если у нас пропал тултип тогда и удаляем содержимое к нему
                        api.destroy(true);
                        _this.find(".addNewTask").remove();
                    },
                    render: function (event, api) {
                        //ну тут думаю и так всё понятно
                        $(document).on("click", ".addNewTask .icon-cancel", function () {
                            api.destroy(true);
                        });
                        // а тут наверное потом будет ajax запрос на пост и сразу обратка на гет, для получения правильного ID таска
                        // иначе будет потом проблема с конфликтом ID
                        $(this).on("submit", ".addNewTask", function (e) {
                            e.preventDefault();
                            var start_date=(type!="month")?date:date.format()+"T00:00:00",
                                end_date = (type!="month")?date:date.format()+"T23:59:59",
                                title_new=$(this).find("input").val(),
                                id_new = countID;
                            if($(this).find("input").val() != '')
                                $.ajax({
                                    type: "POST",
                                    url: "/taskajax/",
                                    data: {action: "taskAddFast", data:{title:title_new,start:start_date,end:end_date}},
                                    cache: false,
                                    success: function(response){
                                        dataValid(response);
                                        //if(typeof ajaxNotBusy!="undefined"){ajaxNotBusy=1; }
                                        $("#calendar").fullCalendar('renderEvent', {
                                            start: start_date,
                                            end: end_date,
                                            title: title_new,
                                            id: dataValid(response).id, //countID потом удалиться и сюда будет падать уже ИД пришевший с сервака
                                            allDay: (type!="month")?false:true
                                        });

                                    }
                                });
                            api.destroy(true);
                        });
                        //-----
                    }
                }
            });
        },
        eventClick: function (calEvent, jsEvent, view) {
            var _this = $(this);
            /*Тут всё так же по аналогии с кликом на день кроме одного, что сюда уже падают данные с сервака*/
            if ($(this).find(".editTask").length != 0) {
                $(this).find(".editTask").remove();
            }
            $(this).append("<form class='editTask' style='display: none'></form>");
            var newTaskBlock = $(this).find(".editTask");
            newTaskBlock.append("<i class='icon-cancel'></i>");
            newTaskBlock.append("<a class='title' href='/office/tasks/editTask/"+calEvent.id+"'>" + calEvent.title + "</a>");
            newTaskBlock.append("<div class='timeTask'>" + calEvent.start.format('dddd, d MMMM') + "</div>");
            newTaskBlock.append("<div class='buttons'></div>");
            var buttons = newTaskBlock.find(".buttons");
            buttons.append("<a class='remove' href='#'>Удалить</a>");
            $(this).qtip({
                show: {
                    when: {date: 'click'},
                    solo: true,
                    ready: true
                },
                hide: {
                    fixed: false,
                    delay: 100,
                    leave: false,
                    target: $(this).find('form .icon-cancel'),
                    event: 'click'
                },
                position: {
                    my: 'bottom center',
                    at: 'top center',
                    target: [jsEvent.pageX, jsEvent.pageY],
                    viewport: $(window)
                },
                style: {
                    classes: 'lom_tool qtip-shadow-lom qtip-light qtip-shadow',
                    width: 305,
                    tip: {
                        corner: true,
                        width: 21
                    }

                },
                content: {
                    prerender: true,
                    text: function (event, api) {
                        return $(this).find(".editTask").clone();
                    }
                },
                events: {
                    hide: function (event, api) {
                        // For more information on the API object, check-out the API documentation
                        api.destroy(true);
                        _this.find(".addNewTask").remove();
                    },
                    render: function (event, api) {
                        $(document).on("click", ".editTask .icon-cancel", function () {
                            api.destroy(true);
                        });
                        $(document).one("click", ".editTask .remove", function (e) {
                            e.preventDefault();
                            $("#calendar").fullCalendar('removeEvents', calEvent.id);
                            $.ajax({
                                type: "POST",
                                url: "/taskajax/",
                                data: {action: "taskRemove", data:{id:calEvent.id}},
                                cache: false,
                                success: function(response){
                                    dataValid(response);
                                    //if(typeof ajaxNotBusy!="undefined"){ajaxNotBusy=1; }
                                }
                            });
                            api.destroy(true);
                        });
                    }
                }
            });
        },
        eventDrop: function (event) {
            var event_end = event.end;
            if(event_end != null){
                event_end = event.end.format()
            }else{
                var a = [];
                a = event.start.format().split('T');
                event_end = a[0]+"23:59:59";
            }
            $.ajax({
                type: "POST",
                url: "/taskajax/",
                data: {action: "taskOnChange", data:{id:event.id, start: event.start.format(), end:event_end}},
                cache: false,
                success: function(response){
                    dataValid(response);
                    //if(typeof ajaxNotBusy!="undefined"){ajaxNotBusy=1; }
                }
            });
        },
        eventResize: function (event) {
            $.ajax({
                type: "POST",
                url: "/taskajax/",
                data: {action: "taskOnChange", data:{id:event.id, start: event.start.format(), end:event.end.format()}},
                cache: false,
                success: function(response){
                    dataValid(response);
                    //if(typeof ajaxNotBusy!="undefined"){ajaxNotBusy=1; }
                }
            });
        },
        /*eventDestroy: function(event){
            $.ajax({
                type: "POST",
                url: "/taskajax/",
                data: {action: "taskOnChange", data:{id:event.id}},
                cache: false,
                success: function(response){
                    dataValid(response);
                    //if(typeof ajaxNotBusy!="undefined"){ajaxNotBusy=1; }
                }
            });
        },*/
        eventLimit: true, // allow "more" link when too many events
        events: arr,
        columnFormat: ($(window).width() > 1024) ? "dddd" : "dd"
    });
    $(".xdsoft_label.xdsoft_month div, .xdsoft_label.xdsoft_year div").remove(); //удаляем лишние блоки с маленького календаря
    $(".day").click(function () {
        $('#calendar').fullCalendar('changeView', 'agendaDay');
        $('.fc-agendaDay-view .fc-body .fc-scroller').css("overflow", "hidden").mCustomScrollbar();
        var text = $('.fc-agendaDay-view .fc-day-header').text();
        $('.fc-agendaDay-view .fc-day-header').html("<span>" + text + "</span>").prepend("<i class='icon-left-arrow-fully prev'></i>").append("<i class='icon-right-arrow-fully next'></i>");
        $("body .qtip").remove();
        type = "day";
        $("#small-calendar").datetimepicker(["init", parseInt(dateFix), parseInt(monthFix), parseInt(yearFix)]);
        $(this).addClass('active').siblings().removeClass("active");
    });
    $(".week").click(function () {
        $(this).addClass('active').siblings().removeClass("active");
        $('#calendar').fullCalendar('changeView', 'agendaWeek');
        $('.fc-agendaWeek-view .fc-body .fc-scroller').css("overflow", "hidden").mCustomScrollbar();
        $('.fc-agendaWeek-view .fc-day-header').each(function () {
            var dayName = $(this).html();
            if (!$(this).hasClass("yes")) {
                var sp = dayName.split("<br>");
                $(this).html("<div>" + sp[0] + "</div>" + sp[1])
                $(this).addClass("yes")
            }
        });
        $("body .qtip").remove();
        type = "week";
        $("#small-calendar").datetimepicker(["init", parseInt(dateFix), parseInt(monthFix), parseInt(yearFix)]);

    });
    $(".month").click(function () {
        $(this).addClass('active').siblings().removeClass("active");
        $('#calendar').fullCalendar('changeView', 'month');
        $("body .qtip").remove();
        type = "month";
        $("#small-calendar").datetimepicker(["init", parseInt(dateFix), parseInt(monthFix), parseInt(yearFix)]);
    });
    $(document).on("click", ".prev", function () {
        $('#calendar').fullCalendar('prev');
        $('.fc-agendaWeek-view .fc-body .fc-scroller, .fc-agendaDay-view .fc-body .fc-scroller').css("overflow", "hidden").mCustomScrollbar();
        $('.fc-agendaWeek-view .fc-day-header').each(function () {
            var dayName = $(this).html();
            if (!$(this).hasClass("yes")) {
                var sp = dayName.split("<br>");
                $(this).html("<div>" + sp[0] + "</div>" + sp[1])
                $(this).addClass("yes")
            }
        });
        var text = $('.fc-agendaDay-view .fc-day-header').text();
        $('.fc-agendaDay-view .fc-day-header').html("<span>" + text + "</span>").prepend("<i class='icon-left-arrow-fully prev'></i>").append("<i class='icon-right-arrow-fully next'></i>");
        $("body .qtip").remove();
        switch (type) {
            case ("month"):
                if (!$(".xdsoft_calendar").find("td").hasClass("xdsoft_today")) {
                    dateFix = 1;
                }
                if (monthFix > 0) {
                    monthFix--;
                } else {
                    monthFix = 11;
                    yearFix--;
                }
            break;
            case ("week"):
                var curDate = $(".xdsoft_calendar .active_week").find('.xdsoft_current').data("date")
                $(".xdsoft_calendar .active_week").find('.xdsoft_current').removeClass("xdsoft_current")
                $(".xdsoft_calendar").find('.active_week').removeClass("active_week").prev("tr").addClass("active_week");
                curDate = curDate - 7;
                var newDate = $(".xdsoft_calendar .active_week").find('td[data-date="' + curDate + '"]');
                newDate.addClass("xdsoft_current");
                if (curDate > 0) {
                    dateFix = curDate;
                } else {
                    if(monthFix > 0){
                        monthFix--;
                    }else{
                        monthFix = 11;
                        yearFix--;
                    }
                    if (monthFix == 0||monthFix == 2||monthFix == 4||monthFix == 6||monthFix == 7||monthFix == 9||monthFix == 11)dateFix = 31;
                    if (monthFix == 3||monthFix == 5||monthFix == 8||monthFix == 10)dateFix = 30;
                    if (monthFix == 1 && IsLeapYear(yearFix) === true)dateFix=29;
                    if (monthFix == 1 && IsLeapYear(yearFix) === false)dateFix=28;
                }
                break;
            case ("day"):
                var curDate = $(".xdsoft_calendar").find('.xdsoft_current').data("date");
                var curMonth = $(".xdsoft_calendar").find('.xdsoft_current').data("month");
                if (curDate > 1) {
                    curDate = parseInt(curDate) - 1;
                    $(".xdsoft_calendar").find('.xdsoft_current').removeClass("xdsoft_current");
                    $(".xdsoft_calendar").find('[data-date="' + curDate + '"][data-month="' + curMonth + '"]').addClass("xdsoft_current");
                    dateFix = curDate;
                } else{
                    if(monthFix > 0){
                        monthFix--;
                    }else{
                        monthFix = 11;
                        yearFix--;
                    }
                    if (monthFix == 0||monthFix == 2||monthFix == 4||monthFix == 6||monthFix == 7||monthFix == 9||monthFix == 11)dateFix = 31;
                    if (monthFix == 3||monthFix == 5||monthFix == 8||monthFix == 10)dateFix = 30;
                    if (monthFix == 1 && IsLeapYear(yearFix) === true)dateFix=29;
                    if (monthFix == 1 && IsLeapYear(yearFix) === false)dateFix=28;
                }
            break;
        }
        $("#small-calendar").datetimepicker(["init", parseInt(dateFix), parseInt(monthFix), parseInt(yearFix)]);
    });
    $(document).on("click", ".next", function () {
        $('#calendar').fullCalendar('next');
        $('.fc-agendaWeek-view .fc-body .fc-scroller, .fc-agendaDay-view .fc-body .fc-scroller').css("overflow", "hidden").mCustomScrollbar();
        $('.fc-agendaWeek-view .fc-day-header').each(function () {
            var dayName = $(this).html();
            if (!$(this).hasClass("yes")) {
                var sp = dayName.split("<br>");
                $(this).html("<div>" + sp[0] + "</div>" + sp[1])
                $(this).addClass("yes")
            }
        });
        var text = $('.fc-agendaDay-view .fc-day-header').text();
        $('.fc-agendaDay-view .fc-day-header').html("<span>" + text + "</span>").prepend("<i class='icon-left-arrow-fully prev'></i>").append("<i class='icon-right-arrow-fully next'></i>");
        $("body .qtip").remove();
        switch (type) {
            case ("month"):
                if (!$(".xdsoft_calendar").find("td").hasClass("xdsoft_today")) {
                    dateFix = 1;
                }
                if (monthFix < 11) {
                    monthFix++;
                } else {
                    monthFix = 0;
                    yearFix++;
                }
                break;
            case ("week"):
                var curDate = $(".xdsoft_calendar .active_week").find('.xdsoft_current').data("date");
                $(".xdsoft_calendar .active_week").find('.xdsoft_current').removeClass("xdsoft_current");
                $(".xdsoft_calendar").find('.active_week').removeClass("active_week").next("tr").addClass("active_week");
                curDate = curDate + 7;
                var newDate = $(".xdsoft_calendar .active_week").find('td[data-date="' + curDate + '"]');
                newDate.addClass("xdsoft_current");
                if (
                    (curDate > 31 && (monthFix == 0||monthFix == 2||monthFix == 4||monthFix == 6||monthFix == 7||monthFix == 9||monthFix == 11))
                    || (curDate>30 && (monthFix == 3||monthFix == 5||monthFix == 8||monthFix == 10))
                    || (curDate>28 && monthFix == 1 && IsLeapYear(yearFix) === false)
                    || (curDate>29 && monthFix == 1 && IsLeapYear(yearFix) === true)
                ) {
                    if (monthFix < 11) {
                        monthFix++;
                    } else {
                        monthFix = 0;
                        yearFix++;
                    }
                    dateFix = 1;
                } else {
                    dateFix = curDate;
                }
                break;
            case ("day"):
                var curDate = $(".xdsoft_calendar").find('.xdsoft_current').data("date");
                var curMonth = $(".xdsoft_calendar").find('.xdsoft_current').data("month");
                curDate = curDate + 1;
                $(".xdsoft_calendar").find('.xdsoft_current').removeClass("xdsoft_current");
                $(".xdsoft_calendar").find('[data-date="' + curDate + '"][data-month="' + curMonth + '"]').addClass("xdsoft_current")
                if (
                    (curDate > 31 && (monthFix == 0||monthFix == 2||monthFix == 4||monthFix == 6||monthFix == 7||monthFix == 9||monthFix == 11))
                    || (curDate>30 && (monthFix == 3||monthFix == 5||monthFix == 8||monthFix == 10))
                    || (curDate>28 && monthFix == 1 && IsLeapYear(yearFix) === false)
                    || (curDate>29 && monthFix == 1 && IsLeapYear(yearFix) === true)
                ) {
                    if (monthFix < 11) {
                        monthFix++;
                    } else {
                        monthFix = 0;
                        yearFix++;
                    }
                    dateFix = 1;
                } else{
                    dateFix = curDate;
                }
                break;
        }
        $("#small-calendar").datetimepicker(["init", parseInt(dateFix), parseInt(monthFix), parseInt(yearFix)]);
    });
    $(".today").click(function () {
        $('#calendar').fullCalendar('today');
        $('.fc-agendaWeek-view .fc-body .fc-scroller, .fc-agendaDay-view .fc-body .fc-scroller').css("overflow", "hidden").mCustomScrollbar();
        $('.fc-agendaWeek-view .fc-day-header').each(function () {
            var dayName = $(this).html();
            if (!$(this).hasClass("yes")) {
                var sp = dayName.split("<br>");
                $(this).html("<div>" + sp[0] + "</div>" + sp[1])
                $(this).addClass("yes")
            }
        });
        var text = $('.fc-agendaDay-view .fc-day-header').text();
        $('.fc-agendaDay-view .fc-day-header').html("<span>" + text + "</span>").prepend("<i class='icon-left-arrow-fully prev'></i>").append("<i class='icon-right-arrow-fully next'></i>");
        $("body .qtip").remove();
        $("#small-calendar").datetimepicker("reset");
        setTimeout(function() {
            dateFix = $(".xdsoft_calendar").find('.xdsoft_today').data("date");
            monthFix = $(".xdsoft_calendar").find('.xdsoft_today').data("month");
            yearFix = $(".xdsoft_calendar").find('.xdsoft_today').data("year");
        },100)
    });
    /*$(window).keyup(function(event){
        if(event.keyCode == 37){
            $(".prev").click();
        }
        if(event.keyCode == 39){
            $(".next").click();
        }
        console.log(dateFix)
        console.log(monthFix)
    });*/
}
/*Конец всего блока календаря*/


/*Фильтра задач*/
function TableTasksFilters(){
    $("#Project").on("click","li",function(){
        $("#selectProject").html($(this).html());
        $("#selProject").val($(this).attr("data-string")).trigger("change");
    });
    $("#Performer").on("click","li",function(){
        $("#selectPerformer").html($(this).html());
        $("#selPerformer").val($(this).attr("data-string")).trigger("change");
    });
    $("#TaskStatus").on("click","li",function(){
        $("#selectTaskStatus").html($(this).html());
        $("#selTaskStatus").val($(this).attr("data-string")).trigger("change");
    });
    $("#selProject").on("change",function(){
        if($(this).val() != "all"){
            if($("#Project li:first-child").data("string") != "all")$("<li data-string='all'>Все</li>").prependTo("#Project");
            var _this = $(".block-tasks-management").find(".one-task[data-id="+$(this).val()+"]");
        }else{
            var _this = $(".block-tasks-management").find(".one-task");
            $("#Project").find("[data-string=all]").remove();
            $("#selectProject").text("");
        }
        var perf = _this.find(".performer a");
        $("#Performer").find("li").remove();
        $("#selectPerformer").text("");
        var arr = [];
        perf.each(function() {
            if($.inArray($(this).data("user-id"), arr) == -1) {
                arr.push($(this).data("user-id"));
                $("<li data-string='" + $(this).data("user-id") + "'>" + $(this).text() + "</li>").appendTo("#Performer");
            }
        });
        var stat = _this.closest(".one-task").find(".status");
        $("#TaskStatus").find("li").remove();
        $("#selectTaskStatus").text("");
        var arrStat = [];
        stat.each(function() {
            if($.inArray($(this).data("string"), arrStat) == -1){
                arr.push($(this).data("string"))
                $("<li data-string='" + $(this).data("string") + "'>" + $(this).text() + "</li>").appendTo("#TaskStatus");
            }
        });
        if($("#selPerformer").val() != "all"){$("#selPerformer").val("all")}
        if($("#selTaskStatus").val() != "all"){$("#selTaskStatus").val("all")}
        var counter = 0;
        _this.each(function(){
            counter++
            $(this).find(".number").text(counter)
        })
        _this.siblings().slideUp();
        _this.slideDown();
    });
    $("#selPerformer").on("change",function(){
        if($("#selProject").val() != "all"){
            if($(this).val() != "all") {
                if($("#Performer li:first-child").data("string") != "all")$("<li data-string='all'>Все</li>").prependTo("#Performer");
                var _this = $(".block-tasks-management").find(".one-task[data-id="+$("#selProject").val()+"]").find(".performer a[data-user-id="+$(this).val()+"]");
            }else{
                var _this = $(".block-tasks-management").find(".one-task[data-id="+$("#selProject").val()+"]").find(".performer a");
                $("#Performer").find("[data-string=all]").remove();
                $("#selectPerformer").text("");
            }
        }else{
            if($(this).val() != "all") {
                if($("#Performer li:first-child").data("string") != "all")$("<li data-string='all'>Все</li>").prependTo("#Performer");
                var _this = $(".block-tasks-management").find(".performer a[data-user-id=" + $(this).val() + "]");
            }else{
                var _this = $(".block-tasks-management").find(".performer a");
                $("#Performer").find("[data-string=all]").remove();
                $("#selectPerformer").text("");
            }
        }
        var stat = _this.closest(".one-task").find(".status");
        $("#TaskStatus").find("li").remove();
        $("#selectTaskStatus").text("");
        var arr = [];
        stat.each(function() {
            if($.inArray($(this).data("string"), arr) == -1){
                arr.push($(this).data("string"))
                $("<li data-string='" + $(this).data("string") + "'>" + $(this).text() + "</li>").appendTo("#TaskStatus");
            }
        });
        if($("#selTaskStatus").val() != "all"){$("#selTaskStatus").val("all")}
        _this.closest(".one-task").siblings().slideUp();
        _this.closest(".one-task").slideDown();
        var counter = 0;
        _this.closest(".one-task").each(function(){
            counter++
            $(this).closest(".one-task").find(".number").text(counter)
        })
    });
    $("#selTaskStatus").on("change",function(){
        if($(this).val() != "all") {
            if($("#TaskStatus li:first-child").data("string") != "all")$("<li data-string='all'>Все</li>").prependTo("#TaskStatus");
            if ($("#selProject").val() != "all") {
                var _this = $(".block-tasks-management").find(".one-task[data-id=" + $("#selProject").val() + "]").find(".status[data-string=" + $(this).val() + "]");
            } else {
                var _this = $(".block-tasks-management").find(".status[data-string=" + $(this).val() + "]");
            }
        }else{
            if ($("#selProject").val() != "all") {
                var _this = $(".block-tasks-management").find(".one-task[data-id=" + $("#selProject").val() + "]").find(".status");
            }else if($("#selPerformer").val() != "all"){
                var _this = $(".block-tasks-management").find(".performer a[data-user-id=" + $("#selPerformer").val() + "]").closest(".one-task").find(".status");
            }else{
                var _this = $(".block-tasks-management").find(".one-task").find(".status");
            }
            $("#TaskStatus").find("[data-string=all]").remove();
            $("#selectTaskStatus").text("");
        }
        /*var stat = _this.closest(".one-task").find(".status");
        $("#TaskStatus").find("li").remove();
        $("#selectTaskStatus").text("");
        stat.each(function() {
            if($("#TaskStatus li").prevAll().data("string") != $(this).data("string"))
                $("<li data-string='" + $(this).data("string") + "'>" + $(this).text() + "</li>").appendTo("#TaskStatus");
        });*/
        _this.closest(".one-task").siblings().slideUp();
        _this.closest(".one-task").slideDown();
        var counter = 0;
        _this.closest(".one-task").each(function(){
            counter++
            $(this).closest(".one-task").find(".number").text(counter)
        })
    });
}
$(document).ready(function(){
    TableTasksFilters();
});
/*------------------*/


/*Создание задачи*/
function createTask(){
    var numChkList,task,taskParent,ChkListName,ChkListNum,taskName;

    /*Селекторы проект, исполнитель, статус задачи*/
    $("#Projects, #Performers, #TasksStatus").mCustomScrollbar();
    $("#Projects").on("click","li",function(){
        $("#selectProjects").html($(this).html());
        $("#selProjects").val($(this).attr("data-string")).trigger("change");
    });
    $("#Performers").on("click","li",function(){
        $("#selPerformers").val($(this).attr("data-string")).trigger("change");
        $('<div class="one-performer">' +
        '<span data-string="'+$(this).data("string")+'">'+$(this).html()+'</span>' +
        '<i class="icon-cancel"></i><input type="hidden" name="userId[]" value="'+$(this).data("string")+'">' +
        '</div>').appendTo($(".performers .list"));
        $(this).remove();
    });
    $("#TasksStatus").on("click","li",function(){
        $("#selectTasksStatus").html($(this).html());
        $("#selTasksStatus").val($(this).attr("data-string")).trigger("change");
    });
    /*--------------------*/

    /*Добавляем чеклист*/
    $(".addCheckList").on("click", function(){
        //$(".checklist").css("display","inline-block");
        numChkList = ($(".chkListName").data("num") != undefined) ? parseInt($(".chkListName").last().attr("data-num"))+1 : 1;
        var block = $(".createNewTask .main-block .checklists");

        $('<div class="checklist"><p><span class="chkListName" data-num="'+numChkList+'">Чек лист '+numChkList+'</span><i class="icon-cancel remove-checklist"></i><input type="hidden" name="chklist['+numChkList+']" value="Чек лист '+numChkList+'"></p>' +
        '<div class="progress"><div></div></div>' +
        '<div class="list"></div>' +
        '<div class="cab-btn addCheck">Добавить подзадачу</div></div><div class="clear"></div>').appendTo(block);
    });
    /*-------------------*/

    /*При клике на удалить исполнителя перезаписываем его обратно в конец селектора пользователей*/
    $(".performers .list").on("click", ".one-performer .icon-cancel",function(){
        $("<li data-string='"+$(this).siblings("span").data("string")+"'>"+$(this).siblings("span").html()+"</li>").appendTo("#Performers");
        $(this).closest(".one-performer").remove();
    });
    /*------------------*/

    /*Работа с чек листом
    * При клике на название чеклиста вызываем текстерию и сразу ставим фокус*/
    $(".checklists").on("click",".checklist > p span", function(){
        var text = $(this).html();
        ChkListName = text;
        ChkListNum = $(this).attr("data-num");
        $("<textarea style='width: 100%; max-width: 95%; margin: 0' rows='1'>"+text+"</textarea>").appendTo($(this).closest("p"));
        $(this).siblings("textarea").focus();
        $(this).remove();
    });
    /*---*/
    /*При клике на удалить чеклист поднимаемся к родительскому блоку всего чеклиста и удаляем*/
    $(".checklists").on("click",".checklist p .remove-checklist", function(){
        $(this).closest(".checklist").remove();
    });
    /*---*/
    /*Изменение названия одного подпункта в чеклисте*/
    $(".checklists").on("click","span.text", function(){
        var text = $(this).html();
        taskName = $(this).text();
        $("<textarea rows='2'>"+text+"</textarea>").appendTo($(this).closest(".checkbox-group"));
        $(this).siblings("textarea").focus();
        $(this).remove();
    });
    /*---*/
    /*При потере фокуса на текстареи возвращаем обратно в текстовый вид*/
    $(".checklists").on("blur",".checklist > p textarea", function() {
        if($(this).val() == ""){
            $("<span class='chkListName' data-num='"+ChkListNum+"'>"+ChkListName+"</span>").prependTo($(this).closest("p"));
            $(this).remove();
        }else {
            var text = $(this).val();
            $("<span class='chkListName' data-num='"+ChkListNum+"'>" + text + "</span>").prependTo($(this).closest("p"));
            $(this).siblings("input[type=hidden]").val(text);
            $(this).remove();
        }
    });
    $(".checklists").on("blur",".list .checkbox-group textarea", function() {
        if($(this).val() == ""){
            var _this = $(this).closest(".checklist").find(".list .checkbox-group"),
                parent = $(this).closest(".checklist").find(".progress div"),
                f = $(this).closest(".list").find("input[type=checkbox]").first();
            $(this).closest(".checkbox-group").remove();
            f.trigger("change");
            if(_this.length-1 == 0){
                parent.css("width", "0%");
            }
        }else {
            var text = $(this).val();
            $("<span class='text'>" + text + "</span>").appendTo($(this).closest(".checkbox-group"));
            $(this).siblings("input[type=hidden]").val(text);
            $(this).remove();
        }
    });
    /*---*/
    /*Добавляем 1 чекбокс для чеклиста*/
    $(document).on("click",".addCheck",function(){
        var curId = $(".checklists .list .checkbox-group").find("input[type=checkbox]").length;
        task = ($(this).closest(".checklist").find(".list").find(".checkbox-group").attr("data-num") != undefined) ? parseInt($(this).closest(".checklist").find(".list").find(".checkbox-group").last().attr("data-num"))+1 : 1;
        taskParent = $(this).closest(".checklist").find(".chkListName").attr("data-num");
        //console.log(taskParent)
        curId = parseFloat(curId)+1;
        $('<div class="checkbox-group" data-num="'+task+'">'+
        '<input id="'+curId+'" class="css-checkbox" type="checkbox" name="taskstate_'+taskParent+'['+task+']">'+
        '<label class="css-label lite-red-check" name="checkbox_lbl" for="'+curId+'"></label>'+
        '<textarea></textarea>'+
        '<i class="icon-cancel"></i>'+
        '<input type="hidden" name="task_'+taskParent+'['+task+']">'+
        '</div>').appendTo($(this).closest(".checklist").find(".list")).find("textarea").focus().siblings("input[type=checkbox]").trigger("change");
    });
    /*---*/
    /*При клике на удалить задачу удаляем и дёргаем остальные чекбоксы для пересчета выполненных подзадач*/
    $(".checklists").on("click",".list .checkbox-group .icon-cancel", function(){
        var _this = $(this).closest(".checklist").find(".list .checkbox-group"),
            parent = $(this).closest(".checklist").find(".progress div"),
            f = $(this).closest(".list").find("input[type=checkbox]");
        $(this).closest(".checkbox-group").remove();
        f.trigger("change");
        if(_this.length-1 == 0){
            parent.css("width", "0%");
        }
    });
    /*---*/
    /*Про счет выполненых подзадач*/
    $(".checklists").on("change",".list .checkbox-group input[type=checkbox]", function(){
        var all = $(this).closest(".checklist").find(".list .checkbox-group").length;
        var checked = $(this).closest(".checklist").find(".list .checkbox-group input[type=checkbox]:checked").length;
        var persent = parseFloat(checked) / parseFloat(all);
        persent = persent * 100;
        $(this).closest(".checklist").find(".progress div").css("width", persent+"%");
    });
    /*------------------*/
    /*Инициализируем выбор даты для создания задачи*/
    $('.timeoute').datetimepicker({ lang: 'ru', format: 'd.m.Y H:i', step: 30});
    /*------------------*/
}