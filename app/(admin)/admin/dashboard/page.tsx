import Chart from "@/components/adminComponents/chart"
import Featured from "@/components/adminComponents/featured"
import List from "@/components/adminComponents/order-table"
import Widget from "@/components/adminComponents/widget"
 

const DashboardPage = async () => {
   
  return (
    <div className="home"> 
  
    <div className="homeContainer ">
  
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" /> 
      </div>
      <div className="charts">
       <Featured />
      {  <Chart   title="Last 6 Months (Revenue)" aspect={2 / 1} />}
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Orders</div>
       <List /> 
      </div>
    </div>
  </div>
  )
}

export default DashboardPage
