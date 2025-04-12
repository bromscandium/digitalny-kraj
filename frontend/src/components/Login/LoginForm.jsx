import {Button, Form, Input, Select} from 'antd';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import './LoginForm.scss';

function LoginForm() {
    const {t} = useTranslation();

    const commonStyle = {fontFamily: 'Montserrat, sans-serif'};
    const inputStyle = {
        ...commonStyle,
        height: '48px',
        lineHeight: '48px',

    };

    const validateMessages = {
        required: t("{{label}} is required!"),
        types: {
            email: t("{{label}} is not a valid email!"),
            number: t("{{label}} is not a valid number!"),
        },
    };

    const login = {number: '', email: '', password: ''};

    function isEmail(str) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(str);
    }

    const onFinish = () => {
        const fullPhone = `${phoneCode}${rawPhone}`;
        if (['+421', '+420', '+48'].includes(phoneCode)) {
            login.number = fullPhone;
        }
        if (isEmail(email)) login.email = email;
        if (password.length > 0) login.password = password;

        if (!login.number || !login.email || !login.password) return;

        fetch(`http://localhost:3000/users?email=${login.email}&number=${login.number}&password=${login.password}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                    console.log('Успішний логін:', users[0]);
                } else {
                    console.log('Невірні дані для входу');
                }
            })
            .catch(error => console.error('Помилка логіну:', error));
    };

    const handlePhoneChange = (e) => {
        let digits = e.target.value.replace(/\D/g, '');
        if (digits.startsWith('0')) digits = digits.slice(1);
        digits = digits.slice(0, 9);
        setRawPhone(digits);
        form.setFieldsValue({phone: digits});
    };

    const [form] = Form.useForm();
    const [rawPhone, setRawPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mobileOptions = [{value: '+421'}, {value: '+420'}, {value: '+48'}];

    return (
        <div className="login-form-wrapper" style={commonStyle}>
            <Form
                form={form}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                layout="vertical"
                style={commonStyle}
            >
                <Form.Item
                    label={t("Country")}
                    name="country"
                    rules={[{required: true}]}
                    style={commonStyle}
                >
                    <Select
                        name="phoneCode"
                        showSearch
                        placeholder={t("Select a country")}
                        options={mobileOptions}
                        filterOption={(input, option) => {
                            return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
                        }}
                        onChange={(value) => {
                            setPhoneCode(value);
                        }}
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item
                    label={t("Number")}
                    name="number"
                    rules={[
                        {required: true, message: t("Enter mobile number")},
                        {pattern: /^\d{9}$/, message: t("Must be 9 digits")},
                    ]}
                    style={commonStyle}
                >
                    <Input
                        addonBefore={phoneCode || ' '}
                        placeholder="12345678"
                        value={rawPhone}
                        onChange={handlePhoneChange}
                        maxLength={9}
                        inputMode="numeric"
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{type: 'email', required: true}]}
                    style={commonStyle}
                >
                    <Input
                        placeholder="example@gmail.com"
                        onChange={() => setEmail(form.getFieldValue('email'))}
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item label={t("Password")} required style={commonStyle}>
                    <Form.Item
                        name="password"
                        noStyle
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >

                        <Input.Password
                            placeholder={t("enter password")}
                            style={{width: '100%', ...inputStyle}}
                            onChange={() => setPassword(form.getFieldValue('password'))}
                        />
                    </Form.Item>
                </Form.Item>

                <Form.Item style={commonStyle}>
                    <Button type="primary" htmlType="submit" className="btn-register" style={commonStyle}>
                        {t("Submit")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginForm;
