
const ClientNote = React.createClass({
    render() {
        const {
            avatar,
            firstName,
            lastName,
            id
        } = this.props;
        return (
            <div className="active"  id={id}>
                <img src={avatar} />
                <div>
                    <p >{firstName}</p>
                    <p>{lastName}</p>
                </div>
            </div>
        )
    }
});

const ClientList = React.createClass({
    
    handleClick(event) {
        document.querySelectorAll('.active').forEach((div) => div.className = "");
        if (event.target.classList.contains('active')) return;
        event.target.parentNode.classList.add('active');
        let AAA = document.querySelector('.active').getAttribute('id');
        this.props.onSelectLanguage(AAA);
    },

    render() {
        return (
            <div onClick={this.handleClick}>
                {
                    this.props.notes.map((note, index) =>
                        <ClientNote
                            key={index}
                            avatar={note.general.avatar}
                            firstName={note.general.firstName}
                            lastName={note.general.lastName}
                            id={index}
                        />

                    )
                }
            </div>
        );
    }
});

const ClientSearch = React.createClass({
    render() {
    }
});

const DetailInfo = React.createClass({
      getInitialState() {
        return {
            note: this.props.startInfo[this.props.idNumber]
        };
    },
    componentDidUpdate(nextProps){   
       return this.props !== nextProps && 
       this.setState({ note: this.props.startInfo[this.props.idNumber]}) 
    }, 
    render() {
        console.log(this.props.idNumber)
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
    /* запрос из файла */
    getInitialState() {
        return {
            notes: [{
                general: {
                    id: 1,
                    firstName: "Liana",
                    lastName: "Crooks",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg"
                }
            },
            {
                "general": {
                    "firstName": "Deontae",
                    "lastName": "Dare",
                    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/andysolomon/128.jpg"
                }
            },
            {
                "general": {
                    "firstName": "Cortez",
                    "lastName": "Pacocha",
                    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/holdenweb/128.jpg"
                }
            }],
            idNumber: 0
        };
    },
    handleLanguage: function(AAA) {
        this.setState({idNumber: AAA});
    },
    render() {
       console.log(this.state.idNumber)
        return (
            <div>
                <h1>CLIENT LIST</h1>
                <ClientList notes={this.state.notes} onSelectLanguage={this.handleLanguage}/>

                <DetailInfo startInfo={this.state.notes} idNumber={this.state.idNumber}/>
            </div>
        );
    }
});


ReactDOM.render(
    <ListApp />,
    document.getElementById('root')
);