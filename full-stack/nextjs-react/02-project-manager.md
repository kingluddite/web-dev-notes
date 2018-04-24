# Project Manager
* set up nextjs

`pages/index.js`

```
import uuid from 'uuid';
import Projects from './../components/Projects';
import AddProject from './../components/AddProject';

class App extends React.Component {
    state = {
        projects: []
    }

    componentWillMount() {
        this.setState({
            projects: [
                {
                    id: uuid.v4(),
                    title: 'Business Website',
                    category: 'Web Design'
                },
                {
                    id: uuid.v4(),
                    title: 'Social App',
                    category: 'Mobile Development'
                },
                {
                    id: uuid.v4(),
                    title: 'Eccomerce Shopping Cart',
                    category: 'Web Development'
                }
            ]
        })
    }

    handleAddProject = (project) => {
        let projects = this.state.projects;
        projects.push(project);
        this.setState({ projects });
    }

    handleDeleteProject = (id) => {
        let projects = this.state.projects;
        let index = projects.findIndex(x => x.id === id);
        projects.splice(index, 1);
        this.setState({ projects });
    }

    render() {
        return (
            <div>
                <AddProject addProject={this.handleAddProject} />
                <Projects projects={this.state.projects} onDelete={this.handleDeleteProject} />
            </div>
        )
    }
}

export default App;
```

`components/addProject.js`

```
import uuid from 'uuid';
import PropTypes from 'prop-types';

class AddProject extends React.Component {
    constructor() {
        super();
        this.state = {
            newProject: {}
        }
    }
    categoryInput = React.createRef();
    titleInput = React.createRef();

    static defaultProps = {
        categories: [
            'Web Design', 'Web Development', 'Mobile Development'
        ]
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.categoryInput.current.value);
        if (this.titleInput.current.value === '') {
            alert('Title is required');
        } else {
            this.setState({
                newProject: {
                    id: uuid.v4(),
                    title: this.titleInput.current.value,
                    category: this.categoryInput.current.value
                }
            }, function () {
                this.props.addProject(this.state.newProject);
            });
        }
    }

    render() {
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        });

        return (
            <div>
                <h3>Add Project</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label><br />
                        <input type="text" ref={this.titleInput} />
                    </div>
                    <div>
                        <label>Category</label><br />
                        <select ref={this.categoryInput}>
                            {categoryOptions}
                        </select>
                        <br />
                    </div>
                    <br />
                    <input type="submit" value="Submit" />
                    <br />
                </form>
            </div>
        )
    }
}

AddProject.propTypes = {
    addProject: PropTypes.func,
    categories: PropTypes.array
}

export default AddProject;
```

`components/Projects.js`

```
import ProjectItem from './ProjectItem';
import PropTypes from 'prop-types';

class Projects extends React.Component {
    deleteProject(id) {
        this.props.onDelete(id);
    }

    render() {
        let projectItems;
        if (this.props.projects) {
            projectItems = this.props.projects.map(project => {
                return (
                    <ProjectItem key={project.title} onDelete={this.deleteProject.bind(this)} project={project} />
                )
            })
        }

        return (
            <div className="Projects">
                <h3>Latest Projects</h3>
                {projectItems}
            </div>
        )
    }
}

Projects.propTypes = {
    projects: PropTypes.array,
    onDelete: PropTypes.func
}

export default Projects;
```

`components/ProjectItem.js`

```
import PropTypes from 'prop-types';

class ProjectItem extends React.Component {

    deleteProject(id) {
        this.props.onDelete(id);
    }
    render() {

        return (
            <li className="project">
                <strong>{this.props.project.title}</strong>: {this.props.project.category} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>X</a>
            </li>
        )
    }
}

ProjectItem.propTypes = {
    project: PropTypes.object,
    onDelete: PropTypes.func
}

export default ProjectItem;
```

* You can add projects
* You can delete projects
* We check for prop types

## Pull in API
* [JSONPlaceholder Fake REST API](https://jsonplaceholder.typicode.com/)
* For testing and prototyping


