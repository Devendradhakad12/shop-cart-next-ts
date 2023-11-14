'use client'
import {
  AddOutlined,
  DashboardOutlined,
  ExpandMoreOutlined,
  ImportExportOutlined,
  ListAltOutlined,
  PeopleOutline,
  PostAddOutlined
} from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link href={"/"}>
      
      <h2 className=' italic font-bold md:text-4xl text-2xl text-center' >ShopCart</h2>
    </Link>
    <Link href={"/admin/dashboard"}>
      <p>
        <DashboardOutlined /> Dsahboard
      </p>
    </Link>

    <a>
      <TreeView
        defaultCollapseIcon={<ExpandMoreOutlined />}
        defaultExpandIcon={<ImportExportOutlined />}
      >
          <TreeItem nodeId="1" label="Products" >
              <Link href='/admin/products'>
                  <TreeItem nodeId="2" label="All" icon={<PostAddOutlined/>} />
              </Link>
              <Link href='/admin/product/new'>
                  <TreeItem nodeId="3" label="Create" icon={<AddOutlined/>} />
              </Link>

          </TreeItem>
      </TreeView>
    </a>
    <Link href={"/admin/orders"}>
      <p>
          <ListAltOutlined/>
          Orders
      </p>
    </Link>
    <Link href={"/admin/users"}>
      <p>
          <PeopleOutline/>
          Users
      </p>
    </Link>
 
  </div>
  )
}

export default Sidebar
