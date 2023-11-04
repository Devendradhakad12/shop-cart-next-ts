
const AddNewProductPage = () => {
    const category = ["phones", "laptops", "cloths", "gadgets", "toys", "food", "beauty", "sports"]

    const selectStyle = " capitalize text-center w-full bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    return (
        <div className="flex justify-center items-center">

            <div className=" bg-slate-900 shadow-lg shadow-slate-100 flex gap-10 py-10 items-center flex-col w-[400px] h-fit ">
                <div>  <h2 className="font-bold text-3xl italic">Create Product</h2></div>
                <div className="w-full">
                    <form className="flex flex-col w-full gap-2 px-10">
                        <input type="text" placeholder='Product Name' className='input' />
                  <textarea className="input" placeholder="Product Description" rows={5}></textarea>
                        <input type="number" placeholder='Product Price' className='input' />
                        <input type="text" placeholder='Product Name' className='input' />
                        <input type="file"  className='hidden' id="images"  />
                        <label htmlFor="images" className="input" >Click to Select Images</label>
                        <select id="countries" className={selectStyle}>
                            <option selected>Choose a Category</option>
                            {
                                category.map((item) => (
                                    <option key={item} value={item} className=" capitalize py-2" >{item}</option>
                                ))
                            }
                        </select>
                        <button className="btn mt-10">ADD</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default AddNewProductPage
