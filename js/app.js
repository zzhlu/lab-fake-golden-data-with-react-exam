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
  render: function () {
    const text = this.state.isEditor ? 'Preview' : 'Edit';
    return <div>
      <button onClick={this.toggle}>{text}</button>
      <div className={this.state.isEditor ? '' : 'hidden'}>
        <Editor onAdd={this.addElement} elements={this.state.elements}/>
      </div>
      <div className={this.state.isEditor ? 'hidden' : ''}><Preview /></div>
    </div>
  }
});

const Editor = React.createClass({
  render: function () {
    return <div>
      <Right onAdd={this.props.onAdd}/>
      <Left elements={this.props.elements}/>
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
  render: function () {
    return <div>
      {
        this.props.elements.map((ele, index) => {
          return <div key={index}>
            <input type={ele}/>
            <button> -</button>
          </div>
        })
      }
    </div>
  }
});

const Preview = React.createClass({
  render: function () {
    return <div>Preview</div>
  }
});

ReactDOM.render(<App />, document.getElementById('content'));