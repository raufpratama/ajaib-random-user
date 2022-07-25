import { Table, Input, Select, Button, Row, Col, Space } from 'antd'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment'
import React from 'react'
import useData from '../hooks/useData'
import { dateComparer, stringComparer } from '../utilities/comparer'
import { API_URL, GENDER_OPTIONS } from '../utilities/constants'

const { Search } = Input

const columns:ColumnType<IUserResponseData>[] = [
  {
    title:"Username",
    key:"keyword",
    dataIndex: ["login", "username"],
    sorter: (a,b) => stringComparer(a.login.username, b.login.username),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render:(_,record) => `${record.name.first}${record.name.last}`,
    sorter: (a,b) => stringComparer(a.name.first, b.name.first),
  },
  {
    title:"Email",
    dataIndex: "email",
    key: "email",
    sorter: (a,b) => stringComparer(a.email, b.email),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    sorter: (a,b) => stringComparer(a.gender, b.gender),

  },
  {
    title: "Registered Date",
    dataIndex: ["registered", "date"],
    key: "date",
    render:(_,record) => moment(record.registered.date).format("DD-MM-YYYY HH:mm"),
    sorter: (a,b) => dateComparer(a.registered.date, b.registered.date),

  }
]

const defaultFilter:IBaseParams = {
  page: 1,
  results: 50,
  inc: "gender,name,login,registered,email",
  keyword: undefined,
  sortOrder: undefined,
  sortyBy: undefined
}

const Home:React.FC = () => {
  const {queryResult, setFilterItem, filterItem} = useData<IUserResponse, IBaseParams>({url:API_URL},[API_URL],defaultFilter);

  return (
    <div style={{padding:20}}>
      <Space direction='vertical' style={{width:"100%"}}>
      <Row gutter={8}>
        <Col span={6}>
        <Search 
          placeholder="Serch by Name" 
          onSearch={(str) => setFilterItem(prevState=>({...prevState, keyword: str}))} 
          value={filterItem.keyword}
          enterButton 
        />
        </Col>
        <Col span={4}>
        <Select 
          options={GENDER_OPTIONS} 
          placeholder="Filter by Gender" 
          style={{width:"100%"}}
          onSelect={(val:"male" | "female") => setFilterItem(prevState => ({...prevState, gender: val}))}
          value={filterItem.gender}
        />
        </Col>
        <Col span={4}>
        <Button 
          type="primary" 
          onClick={()=>setFilterItem(defaultFilter)}
        >
          Reset Filter
        </Button>
        </Col>
      </Row>     
      <Table 
        onChange={(pagination,__,sorter: any) => {
          setFilterItem(prevState=>({...prevState, sortOrder:sorter.order, sortyBy: sorter.columnKey, page:pagination.current!}))
        }}
        pagination={{current:queryResult.data?.info.page}}
        loading={queryResult.isLoading} 
        columns={columns} 
        dataSource={queryResult.data?.results}
      />
      </Space>
    </div>
  )
}

export default Home;