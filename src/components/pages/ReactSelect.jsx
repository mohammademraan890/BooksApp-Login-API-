import { useContext, useState } from 'react'
// import Select from 'react-select'
import { AppContext } from '../../context/AppContext'
import Heading1 from '../Includes/Heading1'
import ProductCard from "../Includes/ProductCard"
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

const ReactSelect = () => {
  const { State } = useContext(AppContext)
  const {AllBooks} = State;
  const [selectedProduct, setSelectedProduct] = useState([])
  console.log(selectedProduct)
  const animatedTags= makeAnimated();
  const customStyles = {
    input: (base) => ({
      ...base,
      fontSize: "18px",
    }),
    control: (base, state) => ({
      ...base,
      border: `1px solid ${state.isFocused && 'var(--primary-color)'}`,
      boxShadow: "none",
      '&:hover': {
        border: '1px solid var(--primary-color)',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: (state.isFocused ? 'var(--primary-color)' : 'white'),
      color: state.isFocused ? 'white' : "black",
      cursor: 'pointer',
    }),
  }

  return (
    <div className='obj-width1 mt-5'>
      <Heading1 title="Select Products" desc="You can select products here." />
      <CreatableSelect isMulti placeholder="Select the Books" styles={customStyles} closeMenuOnSelect={false}
        onChange={(e) =>{ 
         const selectedBooks= AllBooks?.filter((book)=> e?.some((item)=> item?.value === book?.title))
         console.log(selectedBooks)
         setSelectedProduct(selectedBooks)
        }} 
        options={AllBooks?.map((item) => ({
          label: item?.title,
          value: item?.title,
        }))} />

      {selectedProduct.length > 0 &&
        <div className="row mt-5">
          {
            selectedProduct?.map((product,index)=> { 
              return(
              <ProductCard key={index} title={product?.title} price={product?.price} img={product?.img} author={product?.author} category={product?.category} />
            ) })
          }
        </div>
      }
    </div>
  )
}

export default ReactSelect
