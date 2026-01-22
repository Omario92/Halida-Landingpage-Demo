import React from 'react';

const steps = [
  { title: 'Tải Ảnh Lên', desc: 'Chọn 1 ảnh chân dung rõ mặt của bạn hoặc bạn bè.', icon: '📸' },
  { title: 'Chọn Vai', desc: 'Chọn giới tính và 1 trong 5 tính cách nhân vật.', icon: '🎭' },
  { title: 'Tạo Video', desc: 'AI sẽ ghép mặt bạn vào video mẫu trong giây lát.', icon: '✨' },
  { title: 'Chia Sẻ', desc: 'Tải video và comment tag chiến hữu vào bài đăng.', icon: '🚀' },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Cách Thức Tham Gia</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white text-3xl shadow-md mb-4 border border-gray-100">
                {step.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
