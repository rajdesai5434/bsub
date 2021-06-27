import React from 'react';
import AddCompanySubs from './AddCompanySubs'

class CompanySubsTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
    this.renderCompany = this.renderCompany.bind(this);
  }

  renderCompany(company, index) {
  return (
    <tr key={index}>
      <td>{company.companyName}</td>
      <td>{company.subject}</td>
      <td>{company.body}</td>
    </tr>
  )
}

  render(){
      if (this.props.compRows.length > 0){
        const rows = this.props.compRows
        console.log(rows)
        return (
          <div>
            <div className="container" style={{backgroundColor: 'red'}}>
              <h1> Company Subscriptions!! </h1>
            </div>
            <div className="container" style={{backgroundColor: 'green'}}>
              <p> Total Companies with active subscriptions: {this.props.compCount} </p>
            </div>
            <div className="container" style={{backgroundColor: 'yellow'}}>
              <thead>
                <tr>
                  <th></th>
                  <th>companyName</th>
                  <th>subject</th>
                  <th>body</th>
                </tr>
              </thead>
            </div>
            <div className="container" style={{backgroundColor: 'yellow'}}>
              <tbody>
                {rows.map(this.renderCompany)}
              </tbody>
            </div>
            <div className="container">
            <AddCompanySubs
              compSubs={this.props.compSubs}
              account={this.props.account}
            />
            </div>
          </div>
        );
      }
      else{
        return(
          <div>
          <div className="container" style={{backgroundColor: 'red'}}>
              <h1> Company Subscriptions!! </h1>
          </div>
          <div className="container" style={{backgroundColor: 'green'}}>
            <p> Total Companies with active subscriptions: {this.props.compCount} </p>
          </div>
          </div>
        )
      }
    }
  }
export default CompanySubsTable;
