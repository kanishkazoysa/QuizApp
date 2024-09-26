import React from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const Quiz = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/createQuiz', values);
      message.success('Quiz created successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create quiz');
    }
  };

  return (
    <div className="quiz-container">
      <h2>Create New Quiz</h2>
      <Form form={form} name="quiz_creation" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="title"
          label="Quiz Title"
          rules={[{ required: true, message: 'Please input the quiz title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'questionText']}
                    rules={[{ required: true, message: 'Missing question text' }]}
                  >
                    <Input placeholder="Question Text" />
                  </Form.Item>
                  <Form.List name={[name, 'options']}>
                    {(optionFields, { add: addOption, remove: removeOption }) => (
                      <>
                        {optionFields.map((optionField, index) => (
                          <Space key={optionField.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...optionField}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please input option's text or delete this field.",
                                },
                              ]}
                              noStyle
                            >
                              <Input placeholder="Option text" style={{ width: '60%' }} />
                            </Form.Item>
                            {optionFields.length > 1 && (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => removeOption(optionField.name)}
                              />
                            )}
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => addOption()} block icon={<PlusOutlined />}>
                            Add option
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item
                    {...restField}
                    name={[name, 'correctAnswer']}
                    rules={[{ required: true, message: 'Missing correct answer' }]}
                  >
                    <Input placeholder="Correct Answer (0-based index)" type="number" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add question
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Quiz
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Quiz;