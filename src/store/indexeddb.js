const DB_NAME = 'saaserpreport';
const DB_VERSION = 1;
let DB;

export default {

  async getDb() {
    return new Promise((resolve, reject) => {

      if(DB) { return resolve(DB); }
      console.log('OPENING DB', DB_NAME);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
      request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
      };
	
      request.onsuccess = e => {
        console.log('database opened')
        DB = e.target.result;
        resolve(DB);
      };
			
      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore("reports", { autoIncrement: true, keyPath:'id' });
        db.createObjectStore("user", { autoIncrement: true, keyPath:'id' });
      };
    });
  },
  async saveReportLayout(reportLayout) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['reports'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('reports');
      store.put(reportLayout);
    });	
  },
  async getReportLayout(reportLayoutName) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['reports'],'readonly');
      trans.oncomplete = () => {
        resolve(reportLayouts);
      };
			
      let store = trans.objectStore('reports');
      let reportLayouts = [];
			
      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor && cursor.key === reportLayoutName) {
          reportLayouts.push(cursor.value)
          cursor.continue();
        }
      };

    });
  },
  async saveUser(user) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['user'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('user');
      store.put(user);
    });	
  },
  async getUser() {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['user'],'readonly');
      trans.oncomplete = () => {
        resolve(user);
      };
			
      let store = trans.objectStore('user');
      let user = {};
			
      store.openCursor().onsuccess = e => {
        user = e.value
      };

    });
  },

}