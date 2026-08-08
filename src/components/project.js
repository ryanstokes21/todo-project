const projectList = [];

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }
}

function addProjectsToList(name) {
  const project = new Project(name);

  projectList.push(project);
}
