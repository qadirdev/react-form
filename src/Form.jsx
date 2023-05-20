import { useState } from 'react'
import * as yup from 'yup'

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        password: '',
        confrimPassword: ''
    });

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        age: yup.number().positive().integer().required(),
        password: yup.string().min(7).max(14).required(),
        confrimPassword: yup.string().oneOf([yup.ref('password'), null])
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await schema.validate(formData);
            alert(JSON.stringify(formData, null, 2));
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <div className="Form">
            <div className="title">Sign Up</div>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
                    <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                    <input type="text" name="confrimPassword" placeholder="Confrim Password" value={formData.confrimPassword} onChange={handleInputChange} />
                    <input type="submit" id="submit" />
                </form>
            </div>
        </div>
    )
}

export default Form