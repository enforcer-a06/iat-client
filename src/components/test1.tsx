/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { TextArea } = Input;

const Test1 = () => {
  const recognitionRef = useRef<any>();
  const [textContent, setTextContent] = useState('');

  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // 可以设置语言、音调和语速
    utterance.lang = 'zh-CN'; // 设置语言为中文
    utterance.pitch = 1; // 设置音调（0.1 至 2）
    utterance.rate = 1.3; // 设置语速（0.1 至 10）

    // 选择一个声音（这是可选的，依赖于浏览器和操作系统支持的声音）
    // synth.getVoices() 返回一个包含所有可用声音的数组

    // 播放语音
    console.log('播放语音：', text);

    synth.speak(utterance);
  };

  const onClickStart = () => {
    recognitionRef.current.start();
  };

  const onClickStop = () => {
    recognitionRef.current.stop();
  };

  const onClickSpeak = () => {
    speakText('你好，世界！');
  };

  // 使用示例

  useEffect(() => {
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.continuous = true; // 设置是否连续识别
    recognitionRef.current.interimResults = false; // 设置是否返回临时结果
    recognitionRef.current.lang = 'zh-CN';
    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = ''; // 最终的识别结果
      let interimTranscript = ''; // 临时的识别结果

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        console.log(event.results[i]);

        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // 处理识别结果...
      console.log('临时结果: ', interimTranscript);
      console.log('最终结果: ', finalTranscript);
      // setTextContent(transcript);
    };
    recognitionRef.current.onstart = function () {
      console.log('语音识别已开始');
    };
    recognitionRef.current.onend = function () {
      console.log('语音识别已结束');
    };
    recognitionRef.current.onerror = (event: any) => {
      console.error('语音识别错误：', event.error);
    };
  });

  return (
    <div>
      <TextArea value={textContent} />
      <Button onClick={onClickStart}>开始录音</Button>
      <Button onClick={onClickStop}>停止录音</Button>
      <Button onClick={onClickSpeak}>播放语音</Button>
    </div>
  );
};

export default Test1;
