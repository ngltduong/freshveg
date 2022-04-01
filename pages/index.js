import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import BestSellItem from '../components/BestSellItem'
import DailyCart from '../components/DailyCart';
import {
  BtnLink
} from '../styles/Global.style'
import { getData } from '../utils/fetchData'
import { Container } from '../styles/Global.style'
import { DataContext } from '../store/GlobalState'

import {tablet, desktop} from '../utils/responsive'


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper";

const Main = styled.main`
  & > .swiper{

  }
`

const AboutSection = styled.section`
  width: 100%;
  height: 18rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 34px 16px;
`

const AboutSlogan = styled.h3`
  max-width: 800px;
  width: 100%;
  font-size: 1rem;
  line-height: 1.4;
  text-align: center;
  margin-bottom: 32px;
  font-weight: 400;
  ${(tablet({fontSize: "1.875rem", lineHeight: "2.8rem"}))}
`
const AboutBtn = styled(BtnLink)({
  textTransform: 'uppercase',
  display: 'block',
  fontSize: "0.8rem",
  lineHeight: '1',
  display: 'flex',
  marginLeft: '0'
})

const BestSellSection = styled.section`
  width: 100%;
  /* height: 38.25rem; */
  /* display: flex; */
  position: relative;
  /* flex-direction: column; */
  overflow: hidden;
  user-select: none;
  
`

const BestSellTitle = styled.h2`
  font-size: 1.2rem;
  letter-spacing: 0.4rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  user-select: none;

  ${(tablet({
  fontSize: "2.4rem",
  textShadow: "1px 2px rgb(0 0 0 / 60%)"

  }))}
`

const BestSellOverlay = styled.div`
  background-color: rgb(0,0,0);
  width: 100%;
  height: 200px;
  /* flex: 0 0 38%; */
`

const BestSellWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/Healthy-Recipes.png");
  background-size: cover;
  background-position: 40% 39%;
  background-repeat: no-repeat;
  opacity: 0.6;

`

const BestSellListWrapper = styled.div`
 position: relative;
    width: 500px;
    /* left: 4%; */
    
    margin-top: -94px;
    top: -20%;
  .swiper{
    height: 100%;
  }
  .swiper-button-prev{
    display: none;
  }
  .swiper-button-next{
    /* display: none; */
    left: 53%;
    ${(tablet({display: "none"}))}
  }
  .swiper-wrapper{
    margin-bottom: 12px;
  }
  ${(tablet({
    width: "1248px", 
    paddingLeft: "28px",
    paddingRight: "28px",
    left: "0%"}))}
`  


const BestSellFooter = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
`
const IconsSection = styled.div`
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 0 0;
  margin-bottom: 42px;
  justify-content: center;
  & a:nth-child(5){
    transform: translateY(5px);
  }

  ${(tablet({
    gridTemplateColumns: "repeat(3,150px)",
    gridGap: "0 100px"
  }))}

  ${(desktop({
    gridTemplateColumns: "repeat(6,130px)",
    gridGap: "0 0px",
    gridTemplateRows: "1fr"
  }))}

  /* grid-gap: 20px 0; */
`

const Icon = styled.a`
  width: 100%;
  cursor: pointer;
  &:hover{
    opacity: 0.7;
  }
`

const BlogSection = styled.section`
  margin-top: 36px;
  width: 100%;
`

const Column = styled.div`
  width: 100%;
`

const BlogContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 38px 8px;
`

const BlogTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2rem;
  text-transform: capitalize;
  font-style: italic;
  
`

const BlogSummary = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  color: #727272;
  margin-top: 12px;
  margin-bottom: 30px;
  padding: 0 33px;
`

const DailySection = styled.section`
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    /* padding: 38px 12px; */
    padding-top: 42px;
    padding-bottom: 38px;
    /* padding-left: 14px; */
    background-color: #d8d8d8;
  &::-webkit-scrollbar{
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const DailyHeader = styled.div`
  width: 100%;
  background-color: #357a38;
  padding: 20px 4px;
  cursor: pointer;
  & .flex{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  & .center{
    align-items: center;
    justify-content: center;
  }
  & .text-white{
    color: #fff;
  }
`

const DailySeclector = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

`

const DailyListSelected = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.4rem;
  text-transform: uppercase;
  margin-bottom: 0;
`

const DailyList = styled.ul`
  width: 250px;
  background-color: white;
  position: absolute;
  z-index: 10;
  top: calc(100% + 6px);
  left: -4px;
  padding: 14px 24px;
`

const DailyItem = styled.li`
  font-size: 1rem;
  color: #2e2d2de6;
  width: 100%;
  letter-spacing: 0.3rem;
  padding: -1px 0;
  text-transform: uppercase;
  line-height: 2.2rem;
  font-weight: 600;
  cursor: pointer;
  &:hover{
    color: #357a38;
    text-decoration: underline;
  }
`
const DailyIcon = styled.div`
  & svg{
    font-size: 1.6rem;
  }
`
const DailyFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d8d8d8;
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
  top: -8px;
`

const ShopBtn = styled(BtnLink)`
  &:hover{
    background-color: #fff;
    color: #357a38;
  }
`


const Home = (props) =>{

  const { state, dispatch } = useContext(DataContext)


  const [products, setProducts] = useState(props.products)

  const [blogs, setBlogs] = useState(props.blogs)

  const [categories, setCategories] = useState(props.categories)
  // const [dailyProducts, setDailyProducts]= useState(props.dailyProducts)

  const [slides, setSlides] = useState(props.slides)

  const [toggleDailyList, setToggleDailyList] = useState(false)

  const [dailySort, setDailySort] = useState(categories[0].name)

  const [categoriesId, setCategoriesId] = useState(categories[0]._id)
  
  const [dailyProducts, setDailyProducts] = useState([])

  const [isMobile, setIsMobile] = useState(false)


  const handleSortCategory = (e, category) => {
    setDailySort(category.name)
    setCategoriesId(category._id)
  }

  const handleToggleDailyList = (e) => {
    setToggleDailyList(!toggleDailyList)
  }

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    if(dailySort){

      getData(`product/categories/${categoriesId}`)
            .then(res => {
              if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
              
              setDailyProducts(res.products)
            })
    }
    
  }, [dailySort])

  const handleSetMobileSize = (window) => {
    if(window.innerWidth > 767){
      setIsMobile(false)
    }
    else{
      setIsMobile(true)
    }
  }

  useEffect(() => {
    const offset = window
    handleSetMobileSize(offset)
  }, [])

  useEffect(() => {
    window.addEventListener('resize',() => handleSetMobileSize(window))
  })

  return (
    <Main>
    <Swiper navigation={true} autoplay={{delay: 5000}} modules={[Navigation, Autoplay]} className="mySwiper">
        {
          !isMobile && (
            slides.filter(slide => slide.size === "large").map(slideshow =>  (
              <SwiperSlide key={slideshow._id}><Image width={800} height={300} layout="responsive" objectFit="cover" objectPosition="56% 30%" src={slideshow.url}/></SwiperSlide>
            ))
          )
        }
        {
          isMobile && (
            slides.filter(slide => slide.size === "mobile").map(slideshow =>  (
              <SwiperSlide key={slideshow._id}><Image width="100%" height={178} layout="responsive" objectFit="contain" src={slideshow.url}/></SwiperSlide>
            ))
          )
        }
    </Swiper>
    <AboutSection>
      <AboutSlogan>Organic and fresh ingredient vegetable that good for you, your family, and the environment too.</AboutSlogan>
      <BtnLink color={'white'} backgroundColor={'#357a38'} opacity={'0.6'}>READ OUR STORY</BtnLink>
    </AboutSection>
    <BestSellSection>
        <BestSellOverlay>
          <BestSellWrapper>
          </BestSellWrapper>
        </BestSellOverlay>
        <BestSellTitle>Our BestSellers</BestSellTitle>
        {/* <div className="clear-fix"></div> */}
        <Container className="flex center">
          <BestSellListWrapper>
            <Swiper 
              navigation={true} 
              autoplay={{delay: 5000}} 
              modules={[Navigation, Autoplay]} className="mySwiper"
              slidesPerView={2}
              spaceBetween={20}
              autoHeight={true}
              // style={{overflow: "hidden"}}
              // centeredSlides={true}
              // freeMode={true}
              loop={true}
              breakpoints= {
                {
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    
                  }
                } 
              }
              >
              

              {/* {
                slideshows.map(slideshow =>  (
                  <SwiperSlide key={slideshow._id}><Image width="100%" height={178} layout="responsive" objectFit="contain" src={slideshow.url}/></SwiperSlide>
                ))
              } */}

              {
                products.map(product => (
                  <SwiperSlide 
                  // style={{width: "300px"}}
                  key={product._id}><BestSellItem product={product}/></SwiperSlide>
                ))
              }

            </Swiper>
          </BestSellListWrapper>
        </Container>
        
         {/* <div className="clear-fix"></div> */}
        
        <BestSellFooter>
          <BtnLink color={'#357a38'} backgroundColor={'transparent'}>SEE ALL</BtnLink>
          {/* <div className='swiper-button-next'></div> */}
        </BestSellFooter>
    </BestSellSection>

    <IconsSection>
       <Link href="/">
          <Icon>
            <Image width={100} height={90} layout="responsive" src="/vietnammade.svg"/>
          </Icon>
       </Link>
       <Link href="/">
          <Icon>
            <Image width={100} height={90} layout="responsive" src="/natural.svg"/>
          </Icon>
       </Link>
       <Link href="/">
          <Icon>
            <Image width={100} height={90} layout="responsive" src="/organic.svg"/>
          </Icon>
       </Link>
       <Link href="/">
          <Icon>
            <Image width={100} height={90} layout="responsive" src="/cruelty.svg"/>
          </Icon>
       </Link>
       <Link href="/">
          <Icon>
            <Image width={100} height={90} layout="responsive" src="/recycrable.svg"/>
          </Icon>
       </Link>
       <Link href="/">
          <Icon>
            <Image width={100} height={90} layout="responsive" src="/carbon.svg"/>
          </Icon>
       </Link>
    </IconsSection>
      <DailyHeader>
        <Container className="flex center">
            <DailySeclector onClick={handleToggleDailyList} >
              <DailyListSelected>{dailySort}
                {
                !isMobile &&
                <KeyboardArrowDownIcon/>
                }
              </DailyListSelected>
              {
                toggleDailyList &&
                <DailyList>
                  {
                    categories.map(category => (
                      <DailyItem key={category._id} onClick={(e) => handleSortCategory(e, category)}>{category.name}</DailyItem>
                    ))
                  }
                </DailyList>
              }
            {
              isMobile &&
                <DailyIcon>
                  <KeyboardArrowDownIcon/>
                </DailyIcon>
            }  
            
            </DailySeclector>
            {
              !isMobile &&
              <ShopBtn 
                  color={'black'} 
                  backgroundColor={'white'} 
                >
                  See All
              </ShopBtn>
            }
            
            
          </Container>
      </DailyHeader>
    <DailySection>
      <Container>
        <div className="grid row col-4-sm">
          {
            dailyProducts.map(dailyProduct => (
              <Column key={dailyProduct._id}>
                <Link href={`products/item/${dailyProduct.slug}`}>
                  <a>
                    <DailyCart dailyProduct={dailyProduct}/>
                  </a>
                </Link>
              </Column>
            ))
          }
        </div>
      </Container>
    </DailySection>
    {
      isMobile &&
      <DailyFooter>
        <BtnLink 
            color={'white'} 
            backgroundColor={'#357a38'} 
            opacity={'0.6'}
          >
            See All
        </BtnLink>
      </DailyFooter>
    }
    
    <BlogSection>
      <Container className="row grid col-full-width pl-14 pr-14">
        {
          blogs.map(blog => (
            <>
              <Column key={blog._id}>
                <Image width={300} height={300} layout="responsive" src={blog.thumbnail}/>
                <BlogContent>
                  <BlogTitle>
                    {blog.title}
                  </BlogTitle>
                  <BlogSummary>
                    {blog.summary}
                  </BlogSummary>
                  <BtnLink 
                    color={'white'} 
                    backgroundColor={'#357a38'} 
                    opacity={'0.6'}
                  >
                    FIND OUT MORE
                  </BtnLink>
                </BlogContent>
                
              </Column>
            </>
          ))
        }
        {/* <Column>
          <Image width={300} height={300} layout="responsive" src="/agriculture.jpg"/>    
        </Column>
        <Column>
          <Image width={300} height={300} layout="responsive" src="/vegetable.jpg"/>
          <BlogContent>
            <BlogTitle>
               
            </BlogTitle>
          </BlogContent>    
        </Column> */}
      </Container>
    </BlogSection>
    </Main>
  )
}

export async function getServerSideProps(){

  const page =  2
  const category = 'all'
  const sort = '-sold'
  const search = 'all'

  const res =  getData(`product?limit=${page*3}&category=${category}&sort=${sort}&title=${search}`)
  const resBlogs =  getData(`blog/getTwoBlog`)
  const resCategories = getData(`categories`)
  const resSlides = getData(`slides`)
  // const resRandomProduct =  getData(`product/getRandomItem`)
  // console.log(res)
  const data = await Promise.all([res, resBlogs, resCategories, resSlides])
  //server side rendering
  return {
    props: {
      
      products: data[0].products,

      result: data[0].result,

      blogs: data[1].blog,

      categories: data[2].categories,
      
      slides: data[3].slides
    }, // will be passed to the page component as props
  }
}

export default Home