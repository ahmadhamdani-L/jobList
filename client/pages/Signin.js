import React, { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Redirect, Link } from 'react-router-dom'
import ApiAuth from '../api/ApiAuth'


export default function Signin(props) {

  const [values, setValues] = useState({
    username: undefined,
    password: undefined,
    redirect: false,
    error: ''
  });

  const handleOnChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      user_name: values.username || undefined,
      user_password: values.password || undefined
    }

    //setValues({ ...values, error: '', redirect: true })
 
    ApiAuth.signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', redirect: true })

      }
    }) 
 

  }

  const { from } = props.location.state || {
    from: {
      pathname: '/gitjobs/list/'
    }
  }

  if (values.redirect) {
    console.log('redirect : ' || { from })
    return (<Redirect to={from} />)
  }


  return (
    
    <>
    

   
     <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 items-stretch hidden lg:block w-full  h-screen">
          <img
            src="https://img2.pngdownload.id/20180404/raq/kisspng-star-blue-desktop-wallpaper-drawing-white-white-stars-5ac4f6597195f8.6409907315228575614653.jpg"
            alt=""
            class="h-100v" style={{width: "100%"}}
          />
        

        <div class="bg-white w-full absolute bg-opacity-0 top-20 right-10  md:w-1/2 xl:px-28 z-10">
          <div class="w-full h-full ">
            <h1 class="text-xl md:text-2xl  text-blue-500 font-bold leading-tight ">
              Log in to your account
            </h1>

            <form method="POST" action="#" class="mt-6" onSubmit={onSubmit}>
              <div>
                <label class="block text-black">Email Address</label>
                <input onChange={handleOnChange("username")}
                  type="name"
                  name="user_name"
                  id="user_name"
                  placeholder="Enter User Name "
                  class="w-full px-4 py-3 bg-opacity-90 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                />
              </div>

              <div class="mt-4">
                <label class="block text-black">Password</label>
                <input onChange={handleOnChange("password")}
                  type="password"
                  name="user_password"
                  id="user_password"
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-3 bg-opacity-90 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                  required
                />
              </div>

              

              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <p class="mt-8 text-black">
             <Link to="/talent/register/">
             Create Account Here!
             </Link>
            </p>
          </div>
        </div>
        </div>
      </section>
    
    </> )
}