const App = React.createClass({
  getInitialState: function () {
    return {
      isEditor: true,
      elements: []
    }
  },
  toggle: function () {
    this.setState({
      isEditor: !this.state.isEditor
    });
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
    const text = this.state.isEditor ? 'Preview' : 'Edit';
    return <div  className="row">
      <button className="center-block btn btn-info" onClick={this.toggle}>{text}</button>
      <div className={this.state.isEditor ? '' : 'hidden'}>
        <Editor elements={this.state.elements} onAdd={this.addElement} onDelete={this.deleteElement}/>
      </div>
      <div className={this.state.isEditor ? 'hidden' : 'text-center'}>
        <Preview elements={this.state.elements}/>
      </div>
    </div>
  }
});

const Editor = React.createClass({
  render: function () {
    return <div>
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
    return <div className="col-md-offset-8 right">
      <div className="radio"><input type="radio" name="element" value="text"/>Text</div>
      <div className="radio"><input type="radio" name="element" value="date"/>Date</div>
      <button className="addBtn btn btn-info" onClick={this.add}>+</button>
    </div>
  }
});

const Left = React.createClass({
  remove: function (index) {
    this.props.onDelete(index);
  },
  render: function () {
    const elements = this.props.elements.map((ele, index) => {
      return <div key={index}>
        <input type={ele}/>
        <button onClick={this.remove.bind(this, index)}>X</button>
      </div>
    })
    return <div className="col-md-offset-2"> {elements} </div>
  }
});

const Preview = React.createClass({
  render: function () {
    const elements = this.props.elements.map((ele, index) => {
      return <div key={index}>
        <input type={ele}/>
      </div>
    })
    return <div className="center-block preview">
      { elements }
      <button id="submit" className="btn btn-info">Submit</button>
    </div>
  }
});

ReactDOM.render(<App />, document.getElementById('content'));