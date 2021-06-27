import React from 'react';
class AddCompanySubs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      companyName:'',
      subject:'',
      body:''
    }
    this.postNewSub = this.postNewSub.bind(this);
  }

  async postNewSub(){
    console.log("compSubs",this.props.compSubs);
    console.log("account",this.props.account);
    const ret = await this.props.compSubs.methods
    .addCompanySubscription(
      this.state.companyName,
      this.state.subject,
      this.state.body
    ).send({from:this.props.account})
    console.log(ret);
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    let companyName = this.state.companyName;
    let subject = this.state.subject;
    let body = this.state.body;
    console.log(companyName,subject,body)
    if (companyName!=='' && subject!=='' && body!=='') {
      this.postNewSub();
    }
  }

  myCompanyChangeHandler = (event) => {
    console.log(event.target.value)
    this.setState({companyName: event.target.value});
  }

  mySubjectChangeHandler = (event) => {
    console.log(event.target.value)
    this.setState({subject: event.target.value});
  }

  myBodyChangeHandler = (event) => {
    console.log(event.target.value)
    this.setState({body: event.target.value});
  }

  render(){
    return (
      <form onSubmit={this.mySubmitHandler}>
        <p>Enter below to add a company name for new sub:</p>
        <input
          type='text'
          onChange={this.myCompanyChangeHandler}
        />
        <p>Enter below to add a subject for new sub:</p>
        <input
          type='text'
          onChange={this.mySubjectChangeHandler}
        />
        <p>Enter below to add a body for company subs:</p>
        <input
          type='text'
          onChange={this.myBodyChangeHandler}
        />
        <input
        type='submit'
        />
      </form>
    )
  }
}
export default AddCompanySubs;
