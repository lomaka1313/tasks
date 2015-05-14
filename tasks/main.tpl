
<script>

	$(document).ready(function() {
        var array = <?=$userTaskData?>;
        renderCalendar(485, array);
        });

<?php /*

    $(document).ready(function() {
        var array = [
            {
                title: 'All Day Event',
                start: '2015-04-10',
                id: 2,
            },
            {
                title: 'Long Event',
                start: '2015-05-07T09:15:00',
                end: '2015-05-07',
                id: 1
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2015-02-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2015-02-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2015-02-11',
                end: '2015-02-13',
                id: 3
            },
            {
                title: 'Meeting',
                start: '2015-02-12T10:30:00',
                end: '2015-02-12T12:30:00',
                id: 4
            },
            {
                title: 'Lunch',
                start: '2015-02-12T12:00:00',
                id: 46
            },
            {
                title: 'Meeting',
                start: '2015-02-12T14:30:00',
                id: 44
            },
            {
                title: 'Happy Hour',
                start: '2015-02-12T17:30:00',
                id: 47
            },
            {
                title: 'Dinner',
                start: '2015-02-12T20:00:00',
                id: 48
            },
            {
                title: 'Birthday Party',
                start: '2015-02-13T07:00:00',
                id: 43
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2015-02-28',
                id: 41
            }
        ];



        renderCalendar(485, array);
    });
    */ ?>


</script>

<div class="block-calendar-full">
    <div class="block-calendar-left">
        <div class="controls">
            <div class="nav-month">
                <span class="day">День</span>
                <span class="week">Неделя</span>
                <span class="month active">Месяц</span>
            </div>
            <div class="nav-today">
                <span class="today">Сегодня</span>
                <span class="prev">Пред</span>
                <span class="next">След</span>
            </div>
            <div class="date"><span class="dayName"></span> <span></span></div>
        </div>

        <div class="small-calendar">
            <div class="createNewTaskButton">
                <a href="/office/tasks/newtask/" class="cab-btn">Добавить задачу</a>
            </div>
            <div id="small-calendar"></div>
        </div>
    </div>
    <div id='calendar'></div>
</div>
<?php include appPatch."/views/office/tasks/table_tasks.tpl"?>


