## /conf/web.xml

Для всех проектов БыстроБанка: создаем /conf/web.xml

1. все секреты, пароли и т.д., должны заканчиваться на -  
apps.*.user_PASSWORD (например apps.*.user_PASSWORD)  
Это сделано, чтобы можно было в логах замаскировать эти данные и предотвратить утечку данных авторизации  
2. в самих исходниках не должно быть паролей в открытом виде  
3. в самых конфигурационных файлах не должно быть ссылок на банковские ресурсы, ибо они меняются (на девеле свои, на проде другие)  

Настройки приложений такие как месторасположение сервисов, баз данных, системные настройки и пр. вынесены из кода самого приложения. В приложении остаются настройки специфичные для самого приложения.  

Все ресурсы-настройки, используемые приложением должны быть "задекларированы", после чего их значения могут быть получены в приложение и использованы в коде. Для описания "декларации" ресурсов выбран формат дескриптора вэб-приложения j2ee - это файл web.xml в проекте. Значения настроек в данном контексте названы "Environment Entries" - "переменные окружения", но не никакого отношения к системным переменным окружения они не имеют - это "окружение приложения". Для редактирования в Netbeans файла web.xml можно использовать как обычный текстовый режим (закладка "Source" в редакторе), либо "визардоподобный" (закладка "References").  

Значение <env-entry-value> в web.xml должно быть дефолтным для рабочего сервера. Для включения настроек, отличных от рабочего сервера должен использоваться файл context.xml.  

"Декларирование" также преследует цель задокументировать список ресурсов и настроек используемых приложением, поэтому в элементе description должно быть указано краткое описание настройки (для тех кто смотрит на приложение "снаружи" - админов, в противоположность документации о настройках в коде классов - для разработчиков) или причина использования внешнего ресурса. Язык описания указывается стандартным аттрибутом xml:lang="ru" или xml:lang="en" и т.д.  

Основные типы:  

элемент env-entry (раздел "Environment Entries" на закладке "References") - непосредственное значение. типы допустимы только скалярные. чтобы хранить сложные типы (списки, массивы ...) используем "сериализацию" - "списком через запятую" и проч. способы. при чтении значения в приложение десериализовать в структуры языка удобные в работе (array, HashMap, ...). тип значения из java:
```  
    	java.lang.String
    	java.lang.Boolean
    	java.lang.Integer
    	java.lang.Float
```
элемент resource-env-ref (раздел "Resource Environment References" на закладке "References") - ссылка на глобальный ресурс. тип не указываем (отсутствует).  

Пример:
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app
	version="3.1"
	xmlns="http://xmlns.jcp.org/xml/ns/javaee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd">
   ...
	<env-entry>
    	<description xml:lang="ru">дефолтное значение прибитое
        	гвоздями в приложении</description>
    	<env-entry-name>apps.testapp.envB1</env-entry-name>
    	<env-entry-type>java.lang.String</env-entry-type>
    	<env-entry-value>дефолтное значение apps.testapp.envB1</env-entry-value>
	</env-entry>
	<env-entry>
    	<description xml:lang="ru">большой секрет для маленькой такой компании,
        	огромный такой секрет</description>
    	<!-- суффикс _PASSWORD в имени переменной - значение будет скрыто в дампах с ошибками -->
    	<env-entry-name>apps.testapp.user_PASSWORD</env-entry-name>
    	<env-entry-type>java.lang.String</env-entry-type>
    	<!-- значение не указываем - получим его из окружения -->
	</env-entry>
	<resource-env-ref>
    		<description xml:lang="ru">ссылка на некий сервис</description>
<resource-env-ref-name>ru.bystrobank.apps.testapp.newres</resource-env-ref-name>
	</resource-env-ref>
	...
</web-app>
```

Для установки и перекрытия значений также используем (заимствуем для PHP) стандартный описатель контекста - файл context.xml. Данный файл может применяться для различных инстансов приложений (с разными настройками). Такой же файл размещенный в ~/.config/context.xml позволяет при отладке подменять необходимые значениям из одного места для всех приложений разом (и java и php).  

Или кратко: ~/.config/context.xml - ТОЛЬКО для отладки (на уровне пользователя), context.xml - для продакшена (на уровне приложения)  
```
<?xml version="1.0" encoding="UTF-8"?>
<Context path="...">
	...
	<Environment name="apps.testapp.envB2" value="789" type="java.lang.Integer" override="false"/>
	<Environment name="ru.bystrobank.apps.testapp.newres" value="юзеровское значение ru.bystrobank.apps.testapp.newres" override="false"/>
	...
</Context>
```
	 	 	 	
Правила именования базы данных в формате ldap: jdbc/loanapplications/база[_параметры]   
примеры:  
```
<env-entry-name>apps.loanapplications.tasks.checklocationlkenabled</env-entry-name>
<res-ref-name>jdbc/apps.loanapplications/apps.loanapplications.db</res-ref-name> - база данных проекта
<res-ref-name>jdbc/apps.loanapplications/apps.loanapplications.db[_yesterday][_ro]</res-ref-name> - дополнительная база данных проекта (для отчёта например)
<res-ref-name>jdbc/apps.loanapplications/apps.*.db[_yesterday][_ro]</res-ref-name> - дополнительные базы данных
<resource-env-ref-name>.apps.loanapplications.reports_ws</resource-env-ref-name>
```
параметры:
```
[_yesterday] - вчерашняя копия базы
[_ro] - в режиме чтения
```
