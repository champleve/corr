from corrdb.common import logAccess, logStat, logTraffic, crossdomain
from corrdb.common.models import UserModel
from corrdb.common.models import ProjectModel
from corrdb.common.models import EnvironmentModel
from corrdb.common.models import RecordModel
from corrdb.common.models import TrafficModel
from corrdb.common.models import DiffModel
from corrdb.common.models import StatModel
from flask.ext.stormpath import user
from flask.ext.stormpath import login_required
from flask.ext.api import status
import flask as fk
from cloud import app, cloud_response, storage_manager, access_manager, CLOUD_URL, VIEW_HOST, VIEW_PORT, MODE
import datetime
import simplejson as json
import traceback
import smtplib
from email.mime.text import MIMEText
import mimetypes

# CLOUD_VERSION = 1
# CLOUD_URL = '/cloud/v{0}'.format(CLOUD_VERSION)

#Only redirects to pages that signify the state of the problem or the result.
#The API will return some json response at all times. 
#I will handle my own status and head and content and stamp

@app.route(CLOUD_URL + '/private/<hash_session>/diff/create', methods=['GET','POST','PUT','UPDATE','DELETE','POST'])
@crossdomain(fk=fk, app=app, origin='*')
def diff_create(hash_session):
    logTraffic(CLOUD_URL, endpoint='/private/<hash_session>/diff/create')
    if fk.request.method == 'POST':
        access_resp = access_manager.check_cloud(hash_session)
        current_user = access_resp[1]
        if current_user is None:
            return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
        else:
            logAccess(CLOUD_URL, 'cloud', '/private/<hash_session>/diff/create')
            if fk.request.data:
                data = json.loads(fk.request.data)
                record_from_id = data.get("record_from", "")
                record_to_id = data.get("record_to", "")
                method = data.get("method", "undefined")
                proposition = data.get("proposition", "undefined")
                status = data.get("status", "undefined")
                comments = data.get("comments", [])

                if record_from_id == "" or record_to_id == "":
                    return cloud_response(400, 'Diff not created.', "Both record from and to be provided.")
                else:
                    try:
                        record_from = RecordModel.objects.with_id(record_from_id)
                        record_to = RecordModel.objects.with_id(record_to_id)
                        if record_to and record_from:
                            diff = DiffModel(created_at=str(datetime.datetime.utcnow()), sender=current_user, targeted=current_user, record_from=record_from, record_to=record_to)
                            diff.method = method
                            diff.proposition = proposition
                            diff.status = status
                            diff.comments = comments
                            diff.save()
                            return cloud_response(201, 'Diff successfully created.', "The diff was created.")
                        else:
                            return cloud_response(400, 'Diff not created.', "Both record from and to have to exist.")
                    except:
                        return cloud_response(500, 'diff not created.', str(traceback.print_exc()))
            else:
                return fk.redirect('{0}:{1}/error/?code=415'.format(VIEW_HOST, VIEW_PORT))
    else:
        return fk.redirect('{0}:{1}/error/?code=405'.format(VIEW_HOST, VIEW_PORT))

@app.route(CLOUD_URL + '/private/<hash_session>/diff/remove/<diff_id>', methods=['GET','POST','PUT','UPDATE','DELETE','POST'])
@crossdomain(fk=fk, app=app, origin='*')
def diff_remove(hash_session, diff_id):
    logTraffic(CLOUD_URL, endpoint='/private/<hash_session>/diff/remove/<diff_id>')
    if fk.request.method == 'DELETE':
        access_resp = access_manager.check_cloud(hash_session)
        current_user = access_resp[1]
        if current_user is not None:
            try:
                logAccess(CLOUD_URL, 'cloud', '/private/<hash_session>/diff/remove/<diff_id>')
                diff = DiffModel.objects.with_id(diff_id)
            except:
                print(str(traceback.print_exc()))
            if diff is None:
                return fk.redirect('{0}:{1}/error/?code=204'.format(VIEW_HOST, VIEW_PORT))
            else:
                if diff.sender == current_user or diff.targeted == current_user:
                    diff.delete()
                    return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
                else:
                    return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
        else:
            return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
    else:
       return fk.redirect('{0}:{1}/error/?code=405'.format(VIEW_HOST, VIEW_PORT))

@app.route(CLOUD_URL + '/private/<hash_session>/diff/comment/<diff_id>', methods=['GET','POST','PUT','UPDATE','DELETE','POST'])
@crossdomain(fk=fk, app=app, origin='*')
def diff_comment(hash_session, diff_id):
    logTraffic(CLOUD_URL, endpoint='/private/<hash_session>/diff/comment/<diff_id>')
    if fk.request.method == 'POST':
        caccess_resp = access_manager.check_cloud(hash_session)
        current_user = access_resp[1]
        if current_user is not None:
            try:
                logAccess(CLOUD_URL, 'cloud', '/private/<hash_session>/diff/comment/<diff_id>')
                diff = DiffModel.objects.with_id(diff_id)
            except:
                print(str(traceback.print_exc()))
            if diff is None:
                return fk.redirect('{0}:{1}/error/?code=204'.format(VIEW_HOST, VIEW_PORT))
            else:
                if fk.request.data:
                    data = json.loads(fk.request.data)
                    comment = data.get("comment", {})
                    if len(comment) != 0:
                        diff.comments.append(comment)
                        diff.save()
                        return fk.Response('Diff comment posted', status.HTTP_200_OK)
                    else:
                        return fk.redirect('{0}:{1}/error/?code=400'.format(VIEW_HOST, VIEW_PORT))
                else:
                    return fk.redirect('{0}:{1}/error/?code=415'.format(VIEW_HOST, VIEW_PORT))
        else:
            return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
    else:
       return fk.redirect('{0}:{1}/error/?code=405'.format(VIEW_HOST, VIEW_PORT))  

@app.route(CLOUD_URL + '/private/<hash_session>/diff/view/<diff_id>', methods=['GET','POST','PUT','UPDATE','DELETE','POST'])
@crossdomain(fk=fk, app=app, origin='*')
def diff_view(hash_session, diff_id):
    logTraffic(CLOUD_URL, endpoint='/private/<hash_session>/diff/view/<diff_id>')
    if fk.request.method == 'GET':
        access_resp = access_manager.check_cloud(hash_session)
        current_user = access_resp[1]
        if current_user is not None:
            try:
                logAccess(CLOUD_URL, 'cloud', '/private/<hash_session>/diff/view/<diff_id>')
                diff = DiffModel.objects.with_id(diff_id)
            except:
                print(str(traceback.print_exc()))
            if diff is None:
                return fk.redirect('{0}:{1}/error/?code=204'.format(VIEW_HOST, VIEW_PORT))
            else:
                return fk.Response(diff.to_json(), mimetype='application/json')
        else:
            return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
    else:
        return fk.redirect('{0}:{1}/error/?code=405'.format(VIEW_HOST, VIEW_PORT))      

@app.route(CLOUD_URL + '/private/<hash_session>/diff/edit/<diff_id>', methods=['GET','POST','PUT','UPDATE','DELETE','POST'])
@crossdomain(fk=fk, app=app, origin='*')
def diff_edit(hash_session, diff_id):
    logTraffic(CLOUD_URL, endpoint='/private/<hash_session>/diff/edit/<diff_id>')
    if fk.request.method == 'POST':
        access_resp = access_manager.check_cloud(hash_session)
        current_user = access_resp[1]
        if current_user is None:
            return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
        else:
            try:
                logAccess(CLOUD_URL, 'cloud', '/private/<hash_session>/diff/edit/<diff_id>')
                diff = DiffModel.objects.with_id(diff_id)
            except:
                print(str(traceback.print_exc()))
            if diff is None:
                return fk.redirect('{0}:{1}/error/?code=204'.format(VIEW_HOST, VIEW_PORT))
            else:
                if fk.request.data:
                    data = json.loads(fk.request.data)
                    if diff.sender == current_user:
                        try:
                            method = data.get("method", diff.method)
                            proposition = data.get("proposition", diff.proposition)
                            d_status = data.get("status", diff.status)
                            if proposition != diff.proposition or method != diff.method:
                                if diff.status == "agreed" or diff.status == "denied":
                                    diff.status = "altered"
                            if d_status != "":
                                if diff.status == "agreed" or diff.status == "denied":
                                    diff.status = "altered"
                                else:
                                    diff.status = d_status
                            if proposition != "":
                                diff.proposition = proposition
                            if d_status != "":
                                diff.status = d_status
                            diff.save()
                            return fk.Response('Diff edited', status.HTTP_200_OK)
                        except:
                            print(str(traceback.print_exc()))
                            return fk.redirect('{0}:{1}/error/?code=400'.format(VIEW_HOST, VIEW_PORT))
                    elif diff.target == current_user:
                        try:
                            d_status = data.get("status", diff.status)
                            diff.status = d_status
                            diff.save()
                            return fk.Response('Diff edited', status.HTTP_200_OK)
                        except:
                            print(str(traceback.print_exc()))
                            return fk.redirect('{0}:{1}/error/?code=400'.format(VIEW_HOST, VIEW_PORT))
                    else:
                        return fk.redirect('{0}:{1}/error/?code=401'.format(VIEW_HOST, VIEW_PORT))
                else:
                    return fk.redirect('{0}:{1}/error/?code=415'.format(VIEW_HOST, VIEW_PORT))
    else:
        return fk.redirect('{0}:{1}/error/?code=405'.format(VIEW_HOST, VIEW_PORT))

@app.route(CLOUD_URL + '/public/diff/view/<diff_id>', methods=['GET','POST','PUT','UPDATE','DELETE','POST'])
@crossdomain(fk=fk, app=app, origin='*')
def public_diff_view(diff_id):
    logTraffic(CLOUD_URL, endpoint='/public/diff/view/<diff_id>')
    if fk.request.method == 'GET':
        try:
            logAccess(CLOUD_URL, 'cloud', '/public/diff/view/<diff_id>')
            diff = DiffModel.objects.with_id(diff_id)
        except:
            print(str(traceback.print_exc()))
        if diff is None:
            return fk.redirect('{0}:{1}/error/?code=204'.format(VIEW_HOST, VIEW_PORT))
        else:
            return fk.Response(diff.to_json(), mimetype='application/json')
    else:
        return fk.redirect('{0}:{1}/error/?code=405'.format(VIEW_HOST, VIEW_PORT))      