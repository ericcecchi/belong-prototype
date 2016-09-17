import React, {Component} from 'react';
import classnames from 'classnames';

import * as API from './API';

import AuthDialog from './AuthDialog';
import DetailView from './DetailView';
import Button from './Button';
import Callout from './Callout';
import FilterDialog from './FilterDialog';
import FilterBar from './FilterBar';
import ListItem from './ListItem';
import Modal from './Modal';
import TopNavigation from './TopNavigation';

import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import Filters from '../helpers/Filters'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [],
            moreFilters: true,
            opportunities: null,
            organizations: null,
            selected: null,
            isModalOpen: false,
            modal: null,
            user: window.firebase.auth().currentUser || null,
        };
    }

    componentDidMount() {
        window.firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.setState({user});
            } else {
                this.setState({user: null});
            }
        });

        window.firebase.auth().getRedirectResult().then((result)=> {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            // this.setState({user: result.user});
        }).catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

        API.getOpportunities().then((opportunities) => {
            this.setState({
                opportunities
            });
        });
        API.getOrganizations().then((organizations) => {
            this.setState({
                organizations
            });
        });
    }

    signOut = (event)=> {
        firebase.auth().signOut().then(()=> {
            // Success
        }, function (error) {
            // An error happened.
        });
    };

    toggleModal = (type = null)=> {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            modal: type
        });
    };

    setSelected = (id)=> {
        this.setState({selected: id});
    };

    removeFilter = (name)=> {
        const currentState = this.state;
        const hadFilter = currentState.filters.find((filter) => {
            if (filter.name == name) {
                currentState.filters.splice(currentState.filters.indexOf(filter), 1);
                return true;
            } else {
                return false;
            }
        });
        this.setState(Object.assign({}, currentState));
        return hadFilter;
    };

    hasFilter = (name)=> {
        const currentState = this.state;
        return !!currentState.filters.find((filter) => {
            return filter.name == name;
        });
    };

    toggleFilter = (name, isBoolean = false)=> {
        return (event, index, value) => {
            if (typeof value == 'undefined' && index) value = index;
            const currentState = this.state;
            const hadFilter = this.removeFilter(name);
            if (value && (!isBoolean || !hadFilter)) {
                currentState.filters.push({
                    name,
                    value
                });
                this.setState(Object.assign({}, currentState, {selected: null}));
            }
        }
    }

    render() {
        console.log('Belong:render', this.state);
        let opportunities = this.state.opportunities;
        if (opportunities) {
            this.state.filters.forEach((filter) => {
                opportunities = Filters[filter['name']](opportunities, filter['value']);
            });
        }
        const categoryFilter = this.state.filters.find((filter) => filter.name == 'category');
        const category = categoryFilter ? API.getCategoryById(categoryFilter.value) : null;
        const callout = category && (
                <Callout category={category} />
            );
        const selectedOpportunity = this.state.selected != null && opportunities[this.state.selected];
        const selectedOrg = this.state.selected != null && API.getOrgById(opportunities[this.state.selected]['organization']);
        console.log(selectedOrg);
        const topButton = this.state.user ? (
            <IconMenu
                label={this.state.user.displayName}
                iconButtonElement={<Avatar size={32} src={this.state.user.photoURL}/>}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem
                    primaryText="I’m a volunteer"
                    rightIcon={<ArrowDropRight />}
                    menuItems={[
                        <MenuItem primaryText="I’m a volunteer" checked={true} />,
                        <MenuItem primaryText="I’m a group leader" />,
                        <MenuItem primaryText="I’m a nonprofit" />
                    ]}
                />
                <MenuItem primaryText="Settings"/>
                <MenuItem primaryText="Send feedback"/>
                <MenuItem
                    primaryText="Sign out"
                    onClick={this.signOut}
                />
            </IconMenu>
        ) : (
            <Button
                label="Sign in"
                onClick={this.toggleModal.bind(this, 'AUTH')}
            />
        );

        let modal;
        switch (this.state.modal) {
            case 'AUTH':
                modal = <AuthDialog />;
                break;
            case 'FILTER':
                const filters = {};
                this.state.filters.map((filter) => {
                    filters[filter.name] = filter.value;
                });

                modal = (
                    <FilterDialog
                        filters={filters}
                        toggleFilter={this.toggleFilter}
                    />
                );
                break;
            default:
                modal = null;
        }

        return (
            <div className={classnames('Belong', {selected: this.state.selected !== null})}>
                <TopNavigation topButton={topButton}/>

                <div className="Belong-main">
                    <Paper
                        zDepth={2}
                        rounded={false}
                        style={{
                            zIndex: 2,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <FilterBar
                            toggleCategory={this.toggleFilter('category').bind(this)}
                            openModal={this.toggleModal.bind(this, 'FILTER')}
                        />
                    </Paper>

                    <div className="List">
                        {callout}
                        {opportunities && opportunities.map((opportunity, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    onClick={this.setSelected.bind(null, index)}
                                    {...opportunity}
                                    organization={API.getOrgById(opportunity.organization)}
                                />
                            );
                        })}
                        {!opportunities || opportunities.length == 0 && (
                            <div className="EmptyState">
                                <h2>No opportunities found.</h2>
                                <p>Try clearing some filters.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="DetailView-container">
                    {
                        this.state.selected !== null &&
                        opportunities[this.state.selected] &&
                        <DetailView
                            {...selectedOpportunity}
                            organization={selectedOrg}
                            closeView={this.setSelected.bind(this, null)}
                        />
                    }
                </div>

                {this.state.isModalOpen && this.state.modal && (
                    <Modal
                        contentStyle={{maxWidth: '400px'}}
                        open={this.state.isModalOpen}
                        handleClose={this.toggleModal.bind(this)}
                        autoScrollBodyContent={true}
                    >
                        {modal}
                    </Modal>
                )}
            </div>
        );
    }
}
