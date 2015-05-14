<form id="taskCreate" data-trigger="submit-form-ajax">
	<input name="action" type="hidden" value="callodcc" />
	<input name="odccaction" type="hidden" value="taskCreate" />
	<div class="createNewTask">
	    <div class="main-block">
            <div class="title">
                <p>Название задачи</p>
                <input type="text" name="title" required="required" value="<?=@$taskData['title']?>"/>
            </div>
            <div class="description">
                <p>Описание задачи</p>
                <textarea name="descr" rows="5" required="required"></textarea>
            </div>
            <div class="checklists">
                <!--p>Чек лист</p>
                <div class="progress"><div></div></div>
                <div class="list"></div>
                <div class="cab-btn addCheck">Добавить подзадачу</div-->
            </div>
            <div class="performers">
                <p>Исполнители</p>
                <div class="list"></div>
            </div>
	    </div>
	    <div class="right-block">
	    	<?php IF (!empty($projectList)): ?>
	        <div class="project-select">
	            <label>Проект</label>
	            <ul class="Select_account">
	                <li>
	                    <span class="selected" id="selectProjects"></span>
	                    <div class="right_content_jozz">
	                        <span>></span>
	                    </div>
	                    <input id="selProjects" name="id_event" type="hidden" value="all">

	                    <ul id="Projects">
	                    	<?php FOREACH ($projectList AS $prj): ?>
	                    	<li data-string="<?=$prj['id']?>"><?=$prj['name']?></li>
	                        <?php ENDFOREACH; ?>
	                        <!--
	                        <li data-string="1">Свадьба 1</li>
	                        <li data-string="2">Свадьба 2</li>
	                        <li data-string="3">Свадьба 3</li>
	                        -->
	                    </ul>
	                </li>
	            </ul>
	        </div>
	        <?php ENDIF; ?>
	        <?php IF (!empty($staffList)): ?>
	        <div class="performer-select">
	            <label>Исполнитель</label>
	            <ul class="Select_account">
	                <li>
	                    <span class="selected" id="selectPerformers"></span>
	                    <div class="right_content_jozz">
	                        <span>></span>
	                    </div>
	                    <input id="selPerformers" type="hidden" value="all" name="type">
	                    <ul id="Performers">
	                    	<?php FOREACH ($staffList AS $user): ?>
	                    	<li data-string="<?=$user['id']?>"><?=$user['userName']?></li>
	                     	<?php ENDFOREACH; ?>
	                     	<!--
	                        <li data-string="1">Еременко Ольга</li>
	                        <li data-string="2">Салтыкова-Щедрина Алина</li>
	                        <li data-string="3">Вася</li>
	                     	-->
	                    </ul>
	                </li>
	            </ul>
	        </div>
	         <?php ENDIF; ?>
	        <div class="status-select">
	            <label>Статус задачи</label>
	            <ul class="Select_account">
	                <li>
	                    <span class="selected" id="selectTasksStatus"></span>
	                    <div class="right_content_jozz">
	                        <span>></span>
	                    </div>
	                    <input id="selTasksStatus" type="hidden" value="all" name="type">
	                    <ul id="TasksStatus">
	                        <li data-string="allready">Завершено</li>
	                        <li data-string="new">Новая</li>
	                        <li data-string="progress">В работе</li>
	                        <li data-string="late">Просроченно</li>
	                    </ul>
	                </li>
	            </ul>
	        </div>
	        <div class="addCheckList">Добавить чек лист</div>
            <div class="status-select">
                <label>Дата выполнения</label>
            </div>
            <input type="text" class="timeoute" name="time_end" value="<?=date('d.m.Y H:i')?>" readonly="readonly">
	        <div class="inputFile">
	        	<div type="submit" data-trigger="simple-action" data-action="callUsrFileModal">Прикрепить файл</div>
	            <div class="clear"></div>
	            <div id="filesAttach"></div>
	        </div>
	        <div class="save">
	            <button class="cab-btn">Сохранить</button>
	        </div>
    	</div>
	</div>
</form>
<script type="text/javascript">
    createTask();
</script>