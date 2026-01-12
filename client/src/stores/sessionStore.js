class SessionStorage {

  static instance = null;

  static getInstance() {
    if (!SessionStorage.instance) {
      SessionStorage.instance = new SessionStorage();
    }
    return SessionStorage.instance;
  }

  //save user data
  saveUserData(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  //get user data
  getUserData() {
    const userDataString = sessionStorage.getItem('userData')
    return JSON.parse(userDataString)
  }

  //clear user data
  clearUserData(){
    sessionStorage.removeItem('userData');
  }

  //save project data
  saveProjectData(projectData){
    sessionStorage.setItem('projectData', JSON.stringify(projectData));
  }

  //get the project data
  getProjectData(){
    const projectDataString = sessionStorage.getItem('projectData');
    return JSON.parse(projectDataString)
  }

  //clear the project data
  clearProjectData(){
    sessionStorage.removeItem('projectData');
  }
}

export default SessionStorage;
