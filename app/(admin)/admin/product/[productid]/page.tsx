'use client'

import Loader from "@/components/loader"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"

interface oldImageType {
    public_id:string,
    url:string
}

const ProductEditPage = ({ params }: { params: { productid: string } }) => {
    const router = useRouter()
    const [productUpdateLoading, setproductUpdateLoading] = useState(false)
    const [productName, setProductName] = useState<string>()
    const [productDesc, setProductDesc] = useState<string>()
    const [productPrice, setProductPrice] = useState<number>()
    const [productStock, setProductStock] = useState<number>()
    const [productCategory, setProductCategory] = useState<string>()
    const [productImages, setProductImages] = useState<File[]>([])
    const [loading, setLoading] = useState(true)
    const [oldImages, setOldImages] = useState<oldImageType[]>([])


    // get product details

    useEffect(() => {
        const getProductDetails = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/api/product/${params.productid}`)
                const data =  res.data
                setProductName(data.name)
                setProductDesc(data.description)
                setProductPrice(data.price)
                setProductStock(data.stock)
                setProductCategory(data.category)
                setOldImages(data.images)
               
            } catch (error) {
                toast.error("Something went wrong")
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getProductDetails()
    }, [params.productid])

 
    // set images in state
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const filesArray = Array.from(selectedFiles);
            setProductImages(filesArray);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        setproductUpdateLoading(true);
        e.preventDefault();
        const config = { headers: { "Content-Type": "application/json" } };
        try {
       /*      const images = await Promise.all(
                productImages.map(async (img) => {
                    try {
                        const data = new FormData();
                        data.append("file", img);
                        data.append("upload_preset", "ko8fnbhn");
                        data.append("cloud_name", "dvkfio4zq");
                        const uploadRes = await axios.post(
                            `https://api.cloudinary.com/v1_1/dvkfio4zq/image/upload`,
                            data
                        );
                        const public_id = uploadRes.data.public_id;
                        const url = uploadRes.data.secure_url;
                        const imagesUrl = { public_id, url };
                        return imagesUrl;
                    } catch (error) {
                        setproductUpdateLoading(false);
                        console.log(error);
                        return;
                    }
                })
            ); */

            ///    console.log(image);

        /*     if (images[0] === undefined) {
                toast.error("Timed out");
                return;
            } */

            const data = { productName, productDesc, productPrice, productStock, productCategory};

            let res = await axios.patch(
                `/api/product/${params.productid}`,
                data,
                config
            );
            toast.success("Product Updated");
            setProductImages([]);
            router.push("/admin/products")

        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setproductUpdateLoading(false);
        }

    }

    const category = ["phones", "laptops", "cloths", "gadgets", "toys", "food", "beauty", "sports", "watch", "shoes", "bag"]


    return (
        <>

            {
                loading ? <Loader /> :
                    <div className={"newProductContainerImages"}>

                        <div className="   bg-slate-900 shadow-lg shadow-slate-100 flex gap-10 py-10 items-center flex-col w-[500px] h-fit ml-20">
                            <div>  <h2 className="font-bold text-3xl italic">Update Product</h2></div>
                            <div className="w-full">
                                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2 px-10">
                                    <input type="text" placeholder='Product Name' className='input' value={productName} onChange={(e) => setProductName(e.target.value)} required />
                                    <textarea className="input" placeholder="Product Description" rows={5} required onChange={(e) => setProductDesc(e.target.value)}  >{productDesc}</textarea>
                                    <input type="number" placeholder='Product Price' className='input' value={productPrice || ""} required onChange={(e) => setProductPrice(Number(e.target.value))} />
                                    <input type="number" placeholder='Product Stock' className='input' value={productStock || ""} required onChange={(e) => setProductStock(Number(e.target.value))} />
                           {/*          <input multiple accept="image/" type="file" className='hidden' id="images" required onChange={handleFileChange} />
                                    <label htmlFor="images" className="input" >Click to Select Images</label> */}

                                    <select id="countries" className={"selectButton"} value={productCategory} onChange={(e) => setProductCategory(e.target.value)} >
                                        <option selected>Choose a Category</option>
                                        {
                                            category.map((item) => (
                                                <option key={item} value={item} className=" capitalize py-2" >{item}</option>
                                            ))
                                        }
                                    </select>
                                    <button disabled={productUpdateLoading} className="btn mt-10 disabled:opacity-40">{productUpdateLoading ? "Update...." : "Update"}</button>
                                </form>
                            </div>
                        </div>
                    {/*     {
                            productImages?.length >= 0 && <div className="flex justify-center flex-wrap">
                                {productImages.map((image, index) => (
                                    <img className="w-[300px] h-[200px] px-4 py-2" src={URL.createObjectURL(image)} key={index} />
                                ))}
                            </div>
                        } */}
                        {
                            oldImages?.length >= 0 && <div className="flex justify-center flex-wrap">
                                {oldImages.map((image, index) => (
                                    <Image height={200} width={300} alt="product" className="w-[300px] h-[200px] px-4 py-2" src={image.url} key={index} />
                                ))}
                            </div>
                        }
                    </div>
            }
        </>
    )
}

export default ProductEditPage

