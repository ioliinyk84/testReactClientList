const ClientNote = React.createClass({
    render() {
        const {
            avatar,
            firstName,
            lastName,
            id
        } = this.props;
        return (
            <div className="active" id={id}>
                <img src={avatar} />
                <div>
                    {firstName + "  "}
                    {lastName}
                </div>
            </div>
        )
    }
});

const ClientList = React.createClass({
    getInitialState() {
        return {
          myValue: '',
          notes: this.props.notes 
        };
      },
    handleClick(event) {
        document.querySelectorAll('.active').forEach((div) => div.className = "");

        if (event.target.classList.contains('active')) return;
        event.target.parentNode.classList.add('active');

        let num = document.querySelector('.active').getAttribute('id');
        this.props.onPassData(num);
    },
    onChangeHandler(event) {
        this.setState({myValue: event.target.value})
      },
    
    valueInput(){
        const searchField = this.state.myValue;
       
        const myReg = new RegExp(searchField, "i");

        const filteredNotes = this.props.notes.filter((note) => 
        {
           return note.general.firstName.search(myReg) !== -1 ||
            note.general.lastName.search(myReg) !== -1}
        );
        this.props.onPassDataset(filteredNotes); 
        this.setState({notes: filteredNotes});
        
    },
    stopDefAction(){
        event.preventDefault();
    },
    render() {
        return (
            <div>
                <form id="form" onSubmit={this.stopDefAction}>
                <input type="text" 
                placeholder="ПОИСК ПО БАЗЕ" 
                id="item-name" 
                value={this.state.myValue} 
                onChange={this.onChangeHandler}/>
                </form>

                <button onClick={this.valueInput}>Искать </button>

                <div onClick={this.handleClick} id="description">
                    {
                        this.state.notes.map((note, index) =>
                            <ClientNote
                                key={Date.now() + Math.random()}
                                avatar={note.general.avatar}
                                firstName={note.general.firstName}
                                lastName={note.general.lastName}
                                id={index}
                            />

                        )
                    }
                </div>
            </div>
        );
    }
});


const DetailInfo = React.createClass({
    getInitialState() {
        return {
            note: this.props.startInfo[this.props.idNumber]
        };
    },
    componentDidUpdate(nextProps) {
        return this.props !== nextProps &&
            this.setState({ note: this.props.notess[this.props.idNumber] })
    },
    render() {
        
        const {
            note
        } = this.state;
        return (
            <div >
                <img src={note.general.avatar} />
                <div>
                    <p>{note.general.firstName}</p>
                    <p>{note.general.lastName}</p>
                </div>
            </div>
        )
    }
});

const ListApp = React.createClass({

    getInitialState() {
        return {
            notes: [
                {
                    "general": {
                        "firstName": "Liana",
                        "lastName": "Crooks",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg"
                    },
                },
                {
                    "general": {
                        "firstName": "Deontae",
                        "lastName": "Dare",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/andysolomon/128.jpg"
                    },
                },
                {
                    "general": {
                        "firstName": "Cortez",
                        "lastName": "Pacocha",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/holdenweb/128.jpg"
                    },
                }],
            idNumber: 0,
            notess:  [
                {
                    "general": {
                        "firstName": "Liana",
                        "lastName": "Crooks",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg"
                    },
                },
                {
                    "general": {
                        "firstName": "Deontae",
                        "lastName": "Dare",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/andysolomon/128.jpg"
                    },
                },
                {
                    "general": {
                        "firstName": "Cortez",
                        "lastName": "Pacocha",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/holdenweb/128.jpg"
                    },
                }],
        };
    },
    handlePass: function (num) {
        this.setState({ idNumber: num });
    },
     passDataset: function (filteredNotes) {
        this.setState({ notess: filteredNotes });
    }, 
    render() {
        
        return (
            <div>
                <h1>CLIENT LIST</h1>
                <ClientList notes={this.state.notes} onPassData={this.handlePass} onPassDataset={this.passDataset} />

                <DetailInfo startInfo={this.state.notes} notess={this.state.notess} idNumber={this.state.idNumber} />
            </div>
        );
    }
});


ReactDOM.render(
    <ListApp />,
    document.getElementById('root')
);