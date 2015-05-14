<div class="block-tasks-management">
    <div class="filters-headers">
        <?php IF($_SERVER['REQUEST_URI'] != appConfig::officeUrl."tasks/") :?><div class="headText">Поставленные задачи <a class="cab-btn" href="/office/tasks/newtask/">Добавить задачу</a></div><?php ENDIF; ?>
        <div class="headers">
            <div class="project">Проект</div>
            <div class="performer">Исполнитель</div>
            <div class="status">Статус задачи</div>
        </div>
        <div class="filters">
            <div class="project-select">
                <ul class="Select_account">
                    <li>
                        <span class="selected" id="selectProject"></span>
                        <div class="right_content_jozz">
                            <span>></span>
                        </div>
                        <input id="selProject" type="hidden" value="all">
                        <ul id="Project">
                            <li data-string="1">Свадьба 1</li>
                            <li data-string="2">Свадьба 2</li>
                            <li data-string="3">Свадьба 3</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="performer-select">
                <ul class="Select_account">
                    <li>
                        <span class="selected" id="selectPerformer"></span>
                        <div class="right_content_jozz">
                            <span>></span>
                        </div>
                        <input id="selPerformer" type="hidden" value="all" name="type">
                        <ul id="Performer">
                            <li data-string="1">Еременко Ольга</li>
                            <li data-string="2">Салтыкова-Щедрина Алина</li>
                            <li data-string="3">Вася</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="status-select">
                <ul class="Select_account">
                    <li>
                        <span class="selected" id="selectTaskStatus"></span>
                        <div class="right_content_jozz">
                            <span>></span>
                        </div>
                        <input id="selTaskStatus" type="hidden" value="all" name="type">
                        <ul id="TaskStatus">
                            <li data-string="allready">Завершено</li>
                            <li data-string="new">Новая</li>
                            <li data-string="progress">В работе</li>
                            <li data-string="late">Просроченно</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="full-list">
        <div class="one-task in-progress" data-id="1">
            <div class="number">1</div>
            <div class="project"><a href="#">Провести встречу с клиентом</a></div>
            <div class="performer"><a href="#" data-user-id="1">Еременко Ольга</a>,<a href="#" data-user-id="3">Вася</a></div>
            <div class="status" data-string="progress">В работе</div>
            <div class="date">15.06.2015</div>
        </div>

        <div class="one-task late" data-id="2">
            <div class="number">2</div>
            <div class="project"><a href="#">Провести презентацию для клиента</a></div>
            <div class="performer"><a href="#" data-user-id="1">Еременко Ольга</a>,<a href="#" data-user-id="2">Салтыкова-Щедрина Алина</a>,<a href="#" data-user-id="3">Вася</a></div>
            <div class="status"  data-string="late">Просроченно</div>
            <div class="date">15.06.2015</div>
        </div>

        <div class="one-task new" data-id="3">
            <div class="number">4</div>
            <div class="project"><a href="#">Купить Цветы</a></div>
            <div class="performer"><a href="#" data-user-id="1">Еременко Ольга</a></div>
            <div class="status" data-string="new">Новая</div>
            <div class="date">15.06.2015</div>
        </div>

        <div class="one-task" data-id="2">
            <div class="number">3</div>
            <div class="project"><a href="#">Провести презентацию для клиента</a></div>
            <div class="performer"><a href="#" data-user-id="1">Еременко Ольга</a>,<a href="#" data-user-id="2">Салтыкова-Щедрина Алина</a></div>
            <div class="status" data-string="allready">Завершено</div>
            <div class="date">15.06.2015</div>
        </div>
    </div>
</div>