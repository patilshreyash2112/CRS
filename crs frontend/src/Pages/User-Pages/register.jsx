import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/User-Services/user'
import { toast } from 'react-toastify'

function RegisterUser() {
  // create state members
  const [userName, setUserName] = useState('')
  const [adharCardNumber, setAdharCardNumber] = useState('')
  const [email, setEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // get a hook to navigate
  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/login/user')
  }

  const isValidEmail = () => {
    return email.includes('@')
  }

  const onRegister = async () => {

  
    // client side validation
    if (userName.length === 0) {
      toast.warning('Enter Name')
    } else if (adharCardNumber.length !== 12) {
      toast.warning('Enter Adhar Card Number')
    } else if (email.length === 0) {
      toast.warning('Enter Email')
    } else if (addressLine1.length === 0) {
      toast.warning('Enter Address Line 1')
    } else if (addressLine2.length === 0) {
      toast.warning('Enter Address Line 2')
    } else if (state.length === 0) {
      toast.warning('Enter State')
    } else if (city.length === 0) {
      toast.warning('Enter City')
    } else if (pincode.length === 0) {
      toast.warning('Enter Pincode')
    } else if (!isValidEmail()) {
      toast.warning('Email is not valid')
    } else if (password.length === 0) {
      toast.warning('Enter Password')
    } else if (confirmPassword.length === 0) {
      toast.warning('Confirm Password')
    } else if (password !== confirmPassword) {
      toast.warning('Password Does Not Match')
    } else {
      // create user object with nested address
      const userDTO = {
        userName,
        adharCardNumber,
        email,
        contactNumber,
        password,
        address: {
          addressLine1,
          addressLine2,
          state,
          city,
          pincode,
        }
      }
  
      // make the API call and receive the result
      try {
        await register(userDTO)
        toast.success('Successfully Registered a User')
        navigate('/')
      } catch (error) {
        toast.error('Failed to register the user')
      }
      
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className='page-title'>Register</h2>

                <div className='row mt-5'>
                  <div className='col-1 mx-auto'></div>

                  <div className='col mx-auto'>
                    <div className='row'>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor=''>Name</label>
                          <input
                            onChange={(e) => {
                              setUserName(e.target.value)
                            }}
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor=''>Adhar Card Number</label>
                          <input
                            onChange={(e) => {
                              setAdharCardNumber(e.target.value)
                            }}
                            type='number'
                            className='form-control'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor=''>Email</label>
                          <input
                            onChange={(e) => {
                              setEmail(e.target.value)
                            }}
                            type='email'
                            className='form-control'
                          />
                        </div>
                      </div>

                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor=''>Phone Number</label>
                          <input
                            onChange={(e) => {
                              setContactNumber(e.target.value)
                            }}
                            type='tel'
                            className='form-control'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor=''>Address Line 1</label>
                          <input
                            onChange={(e) => {
                              setAddressLine1(e.target.value)
                            }}
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor=''>Address Line 2</label>
                          <input
                            onChange={(e) => {
                              setAddressLine2(e.target.value)
                            }}
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor=''>State</label>
                          <input
                            onChange={(e) => {
                              setState(e.target.value)
                            }}
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor='City'>City</label>
                          <input
                            onChange={(e) => {
                              setCity(e.target.value)
                            }}
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor='Pin Code'>Pin code</label>
                          <input
                            onChange={(e) => {
                              setPincode(e.target.value)
                            }}
                            type='text'
                            className='form-control'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor='password'>Password</label>
                          <input
                            onChange={(e) => {
                              setPassword(e.target.value)
                            }}
                            type='password'
                            className='form-control'
                          />
                        </div>
                      </div>

                      <div className='col'>
                        <div className='mb-3'>
                          <label htmlFor='confirm password'>Confirm Password</label>
                          <input
                            onChange={(e) => {
                              setConfirmPassword(e.target.value)
                            }}
                            type='password'
                            className='form-control'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='mb-3'>
                          Already have account ? <Link to='/login/user'>Login here</Link>
                        </div>

                        <button onClick={onRegister} className='btn btn-success'>
                          Register
                        </button>
                        <button onClick={onCancel} className='btn btn-danger ms-2'>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='col-1 mx-auto'></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterUser
