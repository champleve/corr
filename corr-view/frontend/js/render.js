var renderer = {
    user: function(object, ownership, session, picture){
        var content = "<div class='col s12 m6 l4'>";
        content += "<div id='profile-card' class='card'>";
        content += "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='../images/user-bg.jpg' alt='user background'></div>";
        content += "<div class='card-content'>";
        content += "<img src='"+picture+"' alt='' class='circle responsive-img activator card-profile-image'>";
        content += "<a onclick='Materialize.toast(\"<span>User details not implemented yet!</span>\", 3000);' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right disabled'><i class='mdi-action-visibility tooltipped' data-position='top' data-delay='50' data-tooltip='details'></i></a>";

        content += "<span class='card-title activator black-text text-darken-4'> "+object["name"]+"</span>";
        content += "<p class='grey-text ultra-small'><i class='mdi-device-access-time cyan-text text-darken-2'></i> "+object["created"]+"</p>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='tags'><div class='input-field col s12'><i class='mdi-action-turned-in prefix cyan-text text-darken-2'></i><input readonly id='user-organisation-"+object["id"]+"' type='text' value='"+object["organisation"]+"'></div></div>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='description'><div class='input-field col s12'><i class='mdi-action-description prefix cyan-text text-darken-2'></i><input readonly id='user-email-"+object["id"]+"' type='text' value='"+object["email"]+"'></div></div>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='goals'><div class='input-field col s12'><i class='mdi-action-subject prefix cyan-text text-darken-2'></i><textarea readonly class='materialize-textarea' id='user-about-"+object["id"]+"' type='text'>"+object["about"]+"</textarea></div></div>";
        content += "<div class='card-action center-align'>";
        content += "<a onclick='Materialize.toast(\"<span>User apps view not implemented yet!</span>\", 3000);' class='valign left tooltipped' data-position='bottom' data-delay='50' data-tooltip='applications'><i class='mdi-navigation-apps cyan-text text-darken-2'></i> <span class='applications badge'>"+object["apps"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>User projects view not implemented yet!</span>\", 3000);' class='valign tooltipped' data-position='bottom' data-delay='50' data-tooltip='projects'><i class='mdi-file-folder cyan-text text-darken-2'></i> <span class='projects badge'>"+object["projects"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span> User records view not implemented yet!</span>\", 3000);' class='valign right tooltipped' data-position='bottom' data-delay='50' data-tooltip='records'><i class='mdi-file-cloud-upload cyan-text text-darken-2'></i> <span class='records badge'>"+object["records"]+"</span></a>";
        content += "</div>";
        content += "</div>";
        content += "</div>";
        content += "<div id='project-"+object["id"]+"-confirm' class='modal'></div>";
        content += "</div>";
        return content;
    },
    application: function(object, ownership, session){
        var content = "<div class='col s12 m6 l4'>";
        content += "<div id='profile-card' class='card'>";
        content += "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='../images/user-bg.jpg' alt='user background'></div>";
        content += "<div class='card-content'>";
        content += "<img src='../images/gearsIcon.png' alt='' class='circle responsive-img activator card-profile-image'>";
        content += "<a onclick='Materialize.toast(\"<span>Application download not implemented yet!</span>\", 3000);' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-position='bottom' data-delay='50' data-tooltip='download'><i class='mdi-file-cloud-download'></i></a>";
        content += "<a onclick='userViewModal(\""+object["developer"]["id"]+"\",\""+object["developer"]["profile"]["fname"]+"\""+",\""+object["developer"]["profile"]["lname"]+"\",\""+object["developer"]["profile"]["organisation"]+"\",\""+object["developer"]["profile"]["about"]+"\");' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-delay='50' data-tooltip='"+object["developer-name"]+"'><i class='mdi-social-person' data-position='bottom'></i></a>";
        content += "<a onclick='Materialize.toast(\"<span>Application details not implemented yet!</span>\", 3000);' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right disabled'><i class='mdi-action-visibility tooltipped' data-position='top' data-delay='50' data-tooltip='details'></i></a>";

        content += "<span class='card-title activator black-text text-darken-4'> "+object["name"]+"</span>";
        content += "<p class='grey-text ultra-small'><i class='mdi-device-access-time cyan-text text-darken-2'></i> "+object["created"]+"</p>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='tags'><div class='input-field col s12'><i class='mdi-action-turned-in prefix cyan-text text-darken-2'></i><input readonly id='app-access-"+object["id"]+"' type='text' value='"+object["access"]+"'></div></div>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='description'><div class='input-field col s12'><i class='mdi-communication-vpn-key prefix cyan-text text-darken-2'></i><input readonly id='app-token-"+object["id"]+"' type='text' value='"+object["token"]+"'></div></div>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='goals'><div class='input-field col s12'><i class='mdi-action-subject prefix cyan-text text-darken-2'></i><textarea readonly class='materialize-textarea' id='app-about-"+object["id"]+"' type='text'>"+object["about"]+"</textarea></div></div>";
        content += "<div class='card-action center-align'>";
        content += "<a onclick='Materialize.toast(\"<span>Application users view not implemented yet!</span>\", 3000);' class='valign left tooltipped' data-position='bottom' data-delay='50' data-tooltip='users'><i class='mdi-social-group-add cyan-text text-darken-2'></i> <span class='users badge'>"+object["users"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>Application projects view not implemented yet!</span>\", 3000);' class='valign tooltipped' data-position='bottom' data-delay='50' data-tooltip='projects'><i class='mdi-file-folder cyan-text text-darken-2'></i> <span class='projects badge'>"+object["projects"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>Application records view not implemented yet!</span>\", 3000);' class='valign right tooltipped' data-position='bottom' data-delay='50' data-tooltip='records'><i class='mdi-file-cloud-upload cyan-text text-darken-2'></i> <span class='records badge'>"+object["records"]+"</span></a>";
        content += "</div>";
        content += "</div>";
        content += "</div>";
        content += "<div id='app-"+object["id"]+"-confirm' class='modal'></div>";
        content += "</div>";
        return content;
    },
    project: function(object, ownership, session){
        var content = "<div class='col s12 m6 l4'>";
        content += "<div id='profile-card' class='card'>";
        content += "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='../images/user-bg.jpg' alt='user background'></div>";
        content += "<div class='card-content'>";
        content += "<img src='../images/project.png' alt='' class='circle responsive-img activator card-profile-image'>";
        content += "<a onclick='userViewModal(\""+object["owner"]["id"]+"\",\""+object["owner"]["profile"]["fname"]+"\""+",\""+object["owner"]["profile"]["lname"]+"\",\""+object["owner"]["profile"]["organisation"]+"\",\""+object["owner"]["profile"]["about"]+"\");' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-position='bottom' data-delay='50' data-tooltip='"+object["owner-name"]+"'><i class='mdi-social-person'></i></a>";
        content += "<a onclick='Materialize.toast(\"<span>Project details not implemented yet!</span>\", 3000);' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right disabled'><i class='mdi-action-visibility tooltipped' data-position='top' data-delay='50' data-tooltip='details'></i></a>";

        content += "<span class='card-title activator black-text text-darken-4'> "+object["name"]+"</span>";
        content += "<p class='grey-text ultra-small'><i class='mdi-device-access-time cyan-text text-darken-2'></i> "+object["created"]+"</p>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='tags'><div class='input-field col s12'><i class='mdi-action-turned-in prefix cyan-text text-darken-2'></i><input readonly id='project-tags-"+object["id"]+"' type='text' value='"+object["tags"]+"'></div></div>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='description'><div class='input-field col s12'><i class='mdi-action-description prefix cyan-text text-darken-2'></i><input readonly id='project-desc-"+object["id"]+"' type='text' value='"+object["description"]+"'></div></div>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='goals'><div class='input-field col s12'><i class='mdi-action-subject prefix cyan-text text-darken-2'></i><textarea readonly class='materialize-textarea' id='project-goals-"+object["id"]+"' type='text'>"+object["goals"]+"</textarea></div></div>";
        content += "<div class='card-action center-align'>";
        content += "<a onclick='Materialize.toast(\"<span>Project diffs view not implemented yet!</span>\", 3000);' class='valign left tooltipped' data-position='bottom' data-delay='50' data-tooltip='records'><i class='mdi-file-cloud-done cyan-text text-darken-2'></i> <span class='records badge'>"+object["records"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>Project diffs view not implemented yet!</span>\", 3000);' class='valign tooltipped' data-position='bottom' data-delay='50' data-tooltip='diffs'><i class='mdi-image-compare cyan-text text-darken-2'></i> <span class='diffs badge'>"+object["diffs"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span> Project environments view not implemented yet!</span>\", 3000);' class='valign right tooltipped' data-position='bottom' data-delay='50' data-tooltip='environments'><i class='mdi-maps-layers cyan-text text-darken-2'></i> <span class='containers badge'>"+object["environments"]+"</span></a>";
        content += "</div>";
        content += "</div>";
        content += "</div>";
        content += "<div id='project-"+object["id"]+"-confirm' class='modal'></div>";
        content += "</div>";
        return content;
    },
    record: function(object, ownership, session){
        var content = "<div class='col s12 m6 l4' id='"+object["head"]["id"]+"'> ";
        content += "<div id='profile-card' class='card'>";
        content += "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='../images/user-bg.jpg' alt='user background'></div>";
        content += "<div class='card-content'>";
        content += "<img src='../images/record.png' alt='' class='circle responsive-img activator card-profile-image'>";
        content += "<a onclick='projectViewModal(\""+object["head"]["project"]["name"]+"\",\""+object["head"]["project"]["tags"]+"\",\""+object["head"]["project"]["description"]+"\",\""+object["head"]["project"]["goals"]+"\");' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-position='bottom' data-delay='50' data-tooltip='"+object["head"]["project"]["name"]+"'><i class='mdi-file-folder'></i></a>";
        content += "<a onclick=\"space.pull('"+object["head"]["project"]["id"]+"','"+object["head"]["id"]+"')\" class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-position='top' data-delay='50' data-tooltip='download'><i class='mdi-file-cloud-download'></i></a>";
        content += "<a onclick='Materialize.toast(\"<span>Record details not implemented yet!</span>\", 3000);' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right disabled'><i class='mdi-action-visibility tooltipped' data-position='top' data-delay='50' data-tooltip='details'></i></a>";

        content += "<span class='card-title activator grey-text text-darken-4'>"+object["head"]["id"]+"</span>";
        content += "<p class='grey-text ultra-small'><i class='mdi-device-access-time cyan-text text-darken-2'></i> "+object["head"]["created"]+"</p>";
        content += "<div class='row margin'><div class='input-field col s12'><i class='mdi-action-turned-in prefix cyan-text text-darken-2'></i><input readonly id='record-tags-"+object["head"]["id"]+"' type='text' value='"+object["head"]["tags"]+"'></div></div>";
        content += "<div class='row margin'><div class='input-field col s12'><i class='mdi-notification-event-note prefix cyan-text text-darken-2'></i><input readonly id='record-rationels-"+object["head"]["id"]+"' type='text' value='"+object["head"]["rationels"]+"'></div></div>";
        content += "<div class='row margin tooltipped' data-position='bottom' data-delay='50' data-tooltip='status'><div class='input-field col s12'><i class='mdi-action-subject prefix cyan-text text-darken-2'></i><textarea readonly class='materialize-textarea' id='record-status-"+object["head"]["id"]+"' type='text'>This record status is: "+object["head"]["status"]+"</textarea></div></div>";
        content += "<div class='card-action center-align'>";
        content += "<a onclick='Materialize.toast(\"<span>Record inputs view not implemented yet!</span>\", 3000);' class='valign left'><i class='mdi-communication-call-received cyan-text text-darken-2'></i> <span class='inputs badge'>"+object["head"]["inputs"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>Record outputs view not implemented yet!</span>\", 3000);' class='valign'><i class='mdi-communication-call-made cyan-text text-darken-2'></i> <span class='outputs badge'>"+object["head"]["outputs"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>Record dependencies view not implemented yet!</span>\", 3000);' class='valign right'><i class='mdi-editor-insert-link cyan-text text-darken-2'></i> <span class='dependencies badge'>"+object["head"]["dependencies"]+"</span></a>";
        content += "</div>";
        content += "</div>";                
        content += "</div>";
        content += "</div>";
        return content;
    },
    diff: function(object, ownership, session){
        var content = "<div class='col s12 m6 l4' id='"+object["id"]+"'> ";
        content += "<div id='profile-card' class='card'>";
        content += "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='../images/user-bg.jpg' alt='user background'></div>";
        content += "<div class='card-content'>";
        content += "<img src='../images/diff.png' alt='' class='circle responsive-img activator card-profile-image'>";
        content += "<a onclick=\"space.diff_pull('"+object["id"]+"')\" class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-position='top' data-delay='50' data-tooltip='download'><i class='mdi-file-cloud-download'></i></a>";
        content += "<a onclick='Materialize.toast(\"<span>Diff details not implemented yet!</span>\", 3000);' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right disabled'><i class='mdi-action-visibility tooltipped' data-position='top' data-delay='50' data-tooltip='details'></i></a>";

        content += "<span class='card-title activator grey-text text-darken-4'>"+object["id"]+"</span>";
        content += "<p class='grey-text ultra-small'><i class='mdi-device-access-time cyan-text text-darken-2'></i> "+object["created"]+"</p>";
        content += "<div class='row margin'><div class='input-field col s12'><i class='mdi-action-book prefix cyan-text text-darken-2'></i><input readonly placeholder='default,visual,custom' id='diff-method-"+object["id"]+"' type='text' value='"+object["method"]+"'></div></div>";
        content += "<div class='row margin'><div class='input-field col s12'><i class='mdi-action-assignment prefix cyan-text text-darken-2'></i><input readonly placeholder='repeated,reproduced,replicated,non-replicated,non-repeated,non-reproduced' id='diff-proposition-"+object["id"]+"' type='text' value='"+object["proposition"]+"'></div></div>";


        content += "<div class='row margin'><div class='input-field col s12'><i class='mdi-notification-sync prefix cyan-text text-darken-2'></i><textarea class='materialize-textarea' readonly placeholder='agreed,denied' id='diff-status-"+object["id"]+"' type='text'>"+object["status"]+"</textarea></div></div>";
        content += "<div class='card-action center-align'>";
        var record_from = object["from"];
        var record_to = object["to"];

        content += "<a onclick='recordViewModal(\""+record_from["head"]["id"]+"\",\""+record_from["head"]["project-name"]+"\",\""+record_from["head"]["tags"]+"\",\""+record_from["head"]["rationels"]+"\",\""+record_from["head"]["status"]+"\");' class='valign left'><i class='mdi-file-cloud-download cyan-text text-darken-2'></i><span class='from badge'>"+record_from["head"]["id"].substring(0,4)+"..."+record_from["head"]["id"].substring(19,23)+"</span></a>";
        content += "<a onclick='recordViewModal(\""+record_to["head"]["id"]+"\",\""+record_to["head"]["project-name"]+"\",\""+record_to["head"]["tags"]+"\",\""+record_to["head"]["rationels"]+"\",\""+record_to["head"]["status"]+"\");' class='valign'><i class='mdi-file-cloud-upload cyan-text text-darken-2'></i><span class='to badge'>"+record_to["head"]["id"].substring(0,4)+"..."+record_to["head"]["id"].substring(19,23)+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>Diff comments view not implemented yet!</span>\", 3000);' class='valign right'><i class='mdi-editor-insert-comment cyan-text text-darken-2'></i> <span class='comments badge'>"+object["comments"]+"</span></a>";

        content += "</div>";
        content += "</div>";                
        content += "</div>";
        content += "</div>";
        return content;
    },
    env: function(object, ownership, session){
        var content = "<div class='col s12 m6 l4' id='"+object["id"]+"'>";
        content += "<div id='profile-card' class='card'>";
        content += "<div class='card-image waves-effect waves-block waves-light'><img class='activator' src='../images/user-bg.jpg' alt='user background'></div>";
        content += "<div class='card-content'>";
        content += "<img src='../images/env.png' alt='' class='circle responsive-img activator card-profile-image'>";
        content += "<a onclick=\"space.env_pull('"+object["id"]+"')\" class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-position='top' data-delay='50' data-tooltip='download'><i class='mdi-file-cloud-download'></i></a>";
        content += "<a onclick='Materialize.toast(\"<span>Environment details not implemented yet!</span>\", 3000);' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right disabled'><i class='mdi-action-visibility tooltipped' data-position='top' data-delay='50' data-tooltip='details'></i></a>";

        content += "<span class='card-title activator grey-text text-darken-4'>"+object["id"]+"</span>";
        content += "<p class='grey-text ultra-small'><i class='mdi-device-access-time cyan-text text-darken-2'></i> "+object["created"]+"</p>";
        // content += "<a onclick='appViewModal(\""+object["application"]["name"]+"\",\""+object["application"]["access"]+"\",\""+object["application"]["about"]+"\");' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right tooltipped' data-position='bottom' data-delay='50' data-tooltip='"+object["application"]["name"]+"'><i class='mdi-navigation-apps'></i></a>";
        content += "<p class='grey-text ultra-small'><i class='mdi-navigation-apps cyan-text text-darken-2'></i><a onclick='appViewModal(\""+object["application"]["name"]+"\",\""+object["application"]["access"]+"\",\""+object["application"]["about"]+"\");' class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right'>"+object["application"]["name"]+"</a></p>";

        content += "<div class='row margin'><div class='input-field col s12'><i class='mdi-action-turned-in prefix cyan-text text-darken-2'></i><input readonly placeholder='computational,experimental' id='env-group-"+object["id"]+"' type='text' value='"+object["group"]+"'></div></div>";
        content += "<div class='row margin'><div class='input-field col s12'><i class='mdi-action-subject prefix cyan-text text-darken-2'></i><textarea class='materialize-textarea' readonly placeholder='container-based,vm-based,tool-based,cloud-based,device-based,lab-based,custom-based' id='env-system-"+object["id"]+"' type='text'>"+object["system"]+"</textarea></div></div>";


        content += "<div class='card-action center-align'>";

        content += "<a onclick='Materialize.toast(\"<span>Env resources view not implemented yet!</span>\", 3000);' class='valign left'><i class='mdi-file-cloud-download cyan-text text-darken-2'></i><span class='from badge'>"+object["resources"]+"</span></a>";
        content += "<a onclick='Materialize.toast(\"<span>Env comments view not implemented yet!</span>\", 3000);' class='valign right'><i class='mdi-editor-insert-comment cyan-text text-darken-2'></i> <span class='comments badge'>"+object["comments"]+"</span></a>";

        content += "</div>";
        content += "</div>";                
        content += "</div>";
        content += "</div>";
        return content;
    }
}