import { Button, Form, Input, Select, Space, DatePicker } from 'antd';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import './RegistrationForm.scss';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function RegistrationForm() {
    const { t } = useTranslation();

    const commonStyle = { fontFamily: 'Montserrat, sans-serif' };
    const inputStyle = {
        ...commonStyle,
        height: '48px',
        lineHeight: '48px',
    };

    const validateMessages = {
        required: t("${label} is required!"),
        types: {
            email: t("${label} is not a valid email!"),
            number: t("${label} is not a valid number!"),
        },
        number: {
            range: t("${label} must be between ${min} and ${max}"),
        },
    };

    const [form] = Form.useForm();
    const [rawPhone, setRawPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [lang, setLang] = useState('');
    const [preferences, setPreferences] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePhoneChange = (e) => {
        let digits = e.target.value.replace(/\D/g, '');
        if (digits.startsWith('0')) digits = digits.slice(1);
        digits = digits.slice(0, 9);
        setRawPhone(digits);
        form.setFieldsValue({ phone: digits });
    };

    const onChange = (_, dateString) => setAge(dateString);

    const onFinish = () => {
        const user = {
            name, email, phone: `${phoneCode}${rawPhone}`,
            country, age, lang: lang || 'sk',
            preferences: preferences || 'none', password
        };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .then(data => console.log('Реєстрація успішна:', data))
            .catch(err => console.error('Помилка під час реєстрації:', err));
    };

    const phoneOptions = [
        { value: '+421', label: "sk" },
        { value: '+420', label: "cz" },
        { value: '+48', label: "pl" },
    ];

    return (
        <div className="registration-form-wrapper" style={commonStyle}>
            <Form
                form={form}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                layout="vertical"
                style={commonStyle}
            >
                <Form.Item label={t("name")} name="name" rules={[{ required: true }]} style={commonStyle}>
                    <Input placeholder="Jan Genči" onChange={() => setName(form.getFieldValue('name'))} style={inputStyle} />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]} style={commonStyle}>
                    <Input placeholder="example@gmail.com" onChange={() => setEmail(form.getFieldValue('email'))} style={inputStyle} />
                </Form.Item>

                <Form.Item label={t("Country")} name="country" rules={[{ required: true }]} style={commonStyle}>
                    <Select
                        name="phoneCode"
                        showSearch
                        placeholder={t("Select a country")}
                        options={phoneOptions}
                        onChange={(value) => {
                            const selected = phoneOptions.find(opt => opt.value === value);
                            setPhoneCode(value);
                            setCountry(selected?.label || '');
                        }}
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item label={t("Language")} name="lang" style={commonStyle}>
                    <Select
                        showSearch
                        placeholder={t("Select a language")}
                        options={[{ value: 'sk' }, { value: 'cz' }, { value: 'pl' }]}
                        onChange={setLang}
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item
                    label={t("Number")}
                    name="number"
                    rules={[
                        { required: true, message: t("Enter mobile number") },
                        { pattern: /^\d{9}$/, message: t("Must be 9 digits") },
                    ]}
                    style={commonStyle}
                >
                    <Input
                        addonBefore={phoneCode || ' '}
                        placeholder="999999999"
                        value={rawPhone}
                        onChange={handlePhoneChange}
                        maxLength={9}
                        inputMode="numeric"
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item name="birth" label={t("Birth Date")} rules={[{ required: true }]} style={commonStyle}>
                    <DatePicker onChange={onChange} placeholder={t("Birth Date")} style={{ width: '100%', ...inputStyle }} />
                </Form.Item>

                <Form.Item label={t("Preferences")} name="pref" style={commonStyle}>
                    <Select
                        showSearch
                        placeholder={t("Select a preferences")}
                        options={[
                            { value: t("government") },
                            { value: t("health") },
                            { value: t("events") },
                        ]}
                        onChange={setPreferences}
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item label={t("Password")} name="password" rules={[{ required: true }]} style={commonStyle}>
                    <Space direction="horizontal">
                        <Input.Password
                            placeholder={t("enter password")}
                            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                            onChange={() => setPassword(form.getFieldValue('password'))}
                            style={{ width: '100%', ...inputStyle }}
                        />
                    </Space>
                </Form.Item>

                <Form.Item style={{width: '100%'}}>
                    <Button type="primary" htmlType="submit" className="btn-register" style={commonStyle}>
                        {t("Submit")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegistrationForm;
