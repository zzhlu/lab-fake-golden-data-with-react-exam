const App = React.createClass({
  getInitialState: function () {
    return {
      isEditor: true,
      elements: []
    }
  },
  addElement: function (element) {
    const elements = this.state.elements;
    elements.push(element);
    this.setState({
      elements: elements
    });
  },
  deleteElement: function (index) {
    const elements = this.state.elements;
    elements.splice(index, 1);
    this.setState({
      elements: elements
    });
  },
  render: function () {
    return <div>
      {
        this.props.children && React.cloneElement(this.props.children,
          {
            elements: this.state.elements,
            onAdd: this.addElement,
            onDelete: this.deleteElement
          }
        )
      }
    </div>
  }
});

const Editor = React.createClass({
  render: function () {
    return <div>
      <ReactRouter.Link to="/preview">Preview</ReactRouter.Link>
      <Right onAdd={this.props.onAdd}/>
      <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
    </div>
  }
});

const Right = React.createClass({
  add: function () {
    const element = $("input[name=element]:checked").val();
    this.props.onAdd(element);
  },
  render: function () {
    return <div>
      <input type="radio" name="element" value="text"/>Text
      <input type="radio" name="element" value="date"/>Date
      <button onClick={this.add}> +</button>
    </div>
  }
});

const Left = React.createClass({
  remove: function (index) {
    this.props.onDelete(index);
  },
  render: function () {
    return <div>
      {
        this.props.elements.map((ele, index) => {
          return <div key={index}>
            <input type={ele}/>
            <button onClick={this.remove.bind(this, index)}> X</button>
          </div>
        })
      }
    </div>
  }
});

const Preview = React.createClass({
  render: function () {
    return <div>
      <ReactRouter.Link to="/">Edit</ReactRouter.Link>
      {
        this.props.elements.map((ele, index) => {
          return <div key={index}>
            <input type={ele}/>
          </div>
        })
      }
      <button>Submit</button>
    </div>
  }
});

ReactDOM.render(
  <ReactRouter.Router>
    <ReactRouter.Route path="/" component={App}>
      <ReactRouter.IndexRoute component={Editor}/>
      <ReactRouter.Route path="/preview" component={Preview}/>
    </ReactRouter.Route>
  </ReactRouter.Router>
  , document.getElementById('content')
);