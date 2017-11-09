import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../../models/user.model';

import { Storage } from '@ionic/storage';

@Injectable()
export class DataService {
  serverURL: string = 'https://save-hearts.herokuapp.com/';
  // for emulator to connect to localhost
  // serverURL: string = 'http://10.0.2.2:4000/';
  id: string = '';
  jwt: string = '';
  constructor(private _http: Http,
              public storage: Storage) {
              };
  ionViewDidLoad() {

  }
  //===========================================================================================================

  register(user: User) {
    return this._http.post(`${this.serverURL}register`, user);
  };

  login(user, pass) {
    return this._http.post(`${this.serverURL}login`, {"username": user, "password": pass});
  };

  //===========================================================================================================

  // save changes to name component.
  saveName(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        name: dataToUpdate.name,
        lastname: dataToUpdate.lastname
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.put(`${this.serverURL}users/settings/name`, body, options);
  };

  // save changes to birthdate component.
  saveBirthdate(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        birthdate: dataToUpdate.birthdate
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.put(`${this.serverURL}users/settings/birthdate`, body, options);
  };

  // save changes to gender component.
  saveGender(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        gender: dataToUpdate.gender
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.put(`${this.serverURL}users/settings/gender`, body, options);
  };

  // save changes to email component.
  saveEmail(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        email: dataToUpdate.email
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.put(`${this.serverURL}users/settings/email`, body, options);
  };

  // save changes to phone component.
  savePhone(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        phone: dataToUpdate.phone
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.put(`${this.serverURL}users/settings/phone`, body, options);
  };

  // save changes to emergency-contact component
  saveEmergencyContact(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        emergencyContact: dataToUpdate.emergencyContact
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt)
    let options = new RequestOptions({headers: headers});
    return this._http.put(`${this.serverURL}users/settings/emergency-contact`, body, options);
  };

  // save changes to medical-info component.
  saveMecialInfo(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        bloodType: dataToUpdate.bloodType,
        medicalNotes: dataToUpdate.medicalNotes
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.put(`${this.serverURL}users/settings/medical-info`, body, options);
  };
  
  //===========================================================================================================
  
  updatePushId(dataToUpdate) {
    let body = {
      id: dataToUpdate.id,
      data: {
        pushId: dataToUpdate.pushId
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.put(`${this.serverURL}users/settings/push`, body, options);
  };

  deletePushId(dataToUpdate) {
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({headers: headers});
    return this._http.delete(`${this.serverURL}users/settings/push/${dataToUpdate.id}`, options);
  }

  deleteLocation(dataToUpdate) {
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({headers: headers});
    return this._http.delete(`${this.serverURL}users/settings/location/${dataToUpdate.id}`, options);
  }
  updateLocation(dataToUpdate) {
    let body = {
      data : {
        location: {
          coordinates: [dataToUpdate.location.coordinates[0], dataToUpdate.location.coordinates[1]]
        }
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + dataToUpdate.jwt);
    let options = new RequestOptions({headers: headers});
    return this._http.put(`${this.serverURL}users/settings/location/${dataToUpdate.id}`, body, options);
  };

  alertEmergency(data) {
    let body = {
      id: data.id,
      data: {
        user: data.user,
        location: data.location
      }
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + data.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.post(`${this.serverURL}emergency/alert`, body, options);
  };

  addFriend(data) {
    let body = {
      id: data.id,
      username: data.username
    };
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + data.jwt);
    let options = new RequestOptions({headers: headers});
    return this._http.post(`${this.serverURL}friends/add`, body, options);
  }

  removeFriend(data) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + data.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.delete(`${this.serverURL}friends/remove/${data.id}/${data.username}`, options);
  }

  getFriends(data) {
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + data.jwt);
    let options = new RequestOptions({ headers: headers});
    return this._http.get(`${this.serverURL}friends/list/${data.id}`, options);
  }

  removeProfilePicture(data) {
    let headers = new Headers();
    headers.append('Authorization', 'JWT' + data.jwt);
    let options = new RequestOptions({headers: headers});
    return this._http.delete(`${this.serverURL}users/settings/dp/${data.id}`, options);
  };

};
