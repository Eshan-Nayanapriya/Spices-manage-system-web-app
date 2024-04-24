import './PromotionManagement.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

//PromotionManagement
const PromotionManagement = ({url}) => {

    const [image,setImage] = useState(false);
    const [list,setList] = useState([]);
    const [data,setData] = useState({
        id:'',
        discount:'',
        date:''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]: value}))
    }

    //form submit
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id",data.id)
        formData.append("discount",Number(data.discount))
        formData.append("date",data.date)
        formData.append("image",image)

        const response = await axios.post(`${url}/api/promotion/add`,formData);
        
        if(response.data.success) {
            setData({
                id:'',
                discount:'',
                date:''
            })
            setImage(false)
            fetchList();
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    //css for the downloaded pdf
    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4',
          padding: 10,
        },
        row: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
          alignItems: 'center',
          paddingVertical: 5,
        },
        cell: {
          flex: 1,
          textAlign: 'center',
        },
        image: {
          width: 50,
          height: 50,
        },
      });


      //downloaded pdf
      const PDFContent = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.row}>
              <Text style={[styles.cell, { fontWeight: 'bold' }]}>ID</Text>
              <Text style={[styles.cell, { fontWeight: 'bold' }]}>Discount</Text>
              <Text style={[styles.cell, { fontWeight: 'bold' }]}>Date</Text>
              <Text style={[styles.cell, { fontWeight: 'bold' }]}>Image</Text>
            </View>
            {list.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{item.id}</Text>
                <Text style={styles.cell}>{item.discount}</Text>
                <Text style={styles.cell}>{item.date}</Text>
                <Image src={`${url}/images/${item.image}`} style={styles.image} />
              </View>
            ))}
          </Page>
        </Document>
      );

  //get data from the database
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/promotion/list`);
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removePromotion = async (promotionId) => {
    //console.log(promotionId);
    // Show confirmation dialog before removing the promotion
    const isConfirmed = window.confirm("Are you sure you want to remove this promotion?");
    if (!isConfirmed) return; // If not confirmed, do nothing

    const response = await axios.post(`${url}/api/promotion/remove`,{id:promotionId})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='add'>
      <h2>Add Promotion</h2>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
            <p>Product ID</p>
            <input onChange={onChangeHandler} value={data.id} type="text" id='id' name='id' placeholder='Type here' required/>
        </div>
        <div className="add-product-description flex-col">
            <p>Promotion Time</p>
            <input onChange={onChangeHandler} value={data.date} type="date" id='date' name='date' placeholder='Type here' required/>
        </div>
        <div className="add-category-price">
            <div className="add-price flex-col">
                <p>Product Discount</p>
                <input onChange={onChangeHandler} value={data.discount} type="Number" id='discount' name='discount' placeholder='$20' required/>
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>

      <div className='list-add-flex-col'>
      <h2>Promotion List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Id</b>
          <b>Discount</b>
          <b>Date</b>
        </div>
        {list.map((item,index)=> {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.id}</p>
              <p>{item.discount}</p>
              <p>{item.date}</p>
              <p onClick={()=>removePromotion(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
    <div className="download-button">
        <PDFDownloadLink document={PDFContent} fileName="promotion_list.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
    </div>
    </div>
  )
}

export default PromotionManagement
