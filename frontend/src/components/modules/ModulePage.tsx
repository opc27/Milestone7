import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ComprehensionCheck } from './ComprehensionCheck';
import { useModuleContext } from './ModuleContext';
import styles from './ModulePage.module.css';

// Sample content for each module
const moduleContents: Record<number, { title: string; content: string }> = {
  0: {
    title: "Course Overview",
    content: `
      <h1>Welcome to the Temple Preparation Course</h1>
      <p>This course is designed to help you prepare for temple attendance. Throughout these modules, you'll learn about the purpose of temples, the covenants made there, and how to prepare yourself spiritually.</p>
      <p>Each module builds upon the previous one, so it's important to complete them in order. At the end of each module, you'll be asked to complete a comprehension check to ensure you understand the key concepts before moving on.</p>
      <p>Let's begin this sacred journey together!</p>
    `
  },
  1: {
    title: "Introduction",
    content: `
      <h1>Introduction to Temples</h1>
      <p>Temples are sacred buildings where special ordinances and covenants are performed. They are different from regular meetinghouses where Sunday services are held.</p>
      <p>In temples, we learn more about our relationship with God and make sacred promises to follow Jesus Christ. These promises help us live better lives and prepare to return to God's presence.</p>
      <p>The temple is often referred to as "the house of the Lord" because it is a place where we can feel especially close to Him.</p>
      <p>As you prepare to attend the temple, remember that it is a place of peace, learning, and spiritual growth.</p>
    `
  },
  2: {
    title: "Understanding the Temple",
    content: `
      <h1>Understanding the Temple</h1>
      <p>Temples are sacred places where we make covenants with God and learn about our eternal purpose. They are literally houses of the Lord, where His Spirit can dwell.</p>
      <p>In ancient times, temples were central to worship for God's people. Moses built a tabernacle in the wilderness, Solomon built a magnificent temple in Jerusalem, and the Nephites built temples in the Americas.</p>
      <p>Today's temples serve the same essential purpose: to provide a sacred space where we can make covenants and receive ordinances necessary for exaltation.</p>
      <p>The temple is a place of order, beauty, and revelation. Everything in the temple—its design, symbols, and ordinances—teaches us about our relationship with God and our eternal potential.</p>
    `
  },
  3: {
    title: "The Plan of Salvation",
    content: `
      <h1>The Plan of Salvation</h1>
      <p>The Plan of Salvation is God's plan for the happiness of His children. It explains where we came from, why we are here on earth, and where we will go after this life.</p>
      <p>Temple ordinances are essential parts of this plan. In the temple, we learn more about our premortal life, our purpose on earth, and our potential in the eternities.</p>
      <p>The ordinances performed in the temple—baptism for the dead, endowment, and sealing—provide the means by which all of God's children can return to His presence and live as eternal families.</p>
      <p>Understanding the Plan of Salvation helps us see how temple work fits into God's overall purpose for His children.</p>
    `
  },
  4: {
    title: "Covenants and Ordinances",
    content: `
      <h1>Covenants and Ordinances</h1>
      <p>Covenants are sacred agreements between God and His children. When we make covenants, we promise to keep God's commandments, and He promises us blessings in return.</p>
      <p>Ordinances are sacred ceremonies that have spiritual significance. In the temple, we participate in ordinances such as the endowment and sealing, which are accompanied by covenants.</p>
      <p>The covenants we make in the temple are the highest and most sacred covenants available to us. They include promises to live the law of obedience, sacrifice, the gospel, chastity, and consecration.</p>
      <p>By making and keeping these covenants, we prepare ourselves to return to God's presence and receive all the blessings He has in store for His faithful children.</p>
    `
  },
  5: {
    title: "Priesthood Blessings",
    content: `
      <h1>Priesthood Blessings</h1>
      <p>The priesthood is the power and authority of God given to man to act in His name. Through the priesthood, temple ordinances are performed and blessings are given.</p>
      <p>In the temple, both men and women participate in priesthood ordinances and receive priesthood blessings. These blessings include spiritual strength, guidance, healing, and comfort.</p>
      <p>Priesthood blessings are available to all who make and keep temple covenants. They help us navigate life's challenges and draw closer to God.</p>
      <p>As we honor our temple covenants, we can access priesthood power in our daily lives to bless ourselves and others.</p>
    `
  },
  6: {
    title: "Initiatory",
    content: `
      <h1>Initiatory Ordinances</h1>
      <p>The initiatory ordinances are preparatory ordinances that precede the endowment. They include washing, anointing, and clothing in the temple garment.</p>
      <p>These ordinances symbolize cleansing, purification, and preparation for further temple blessings. They are sacred and personal experiences that help prepare us for the endowment.</p>
      <p>The temple garment is a reminder of the covenants we make in the temple. Wearing it daily reminds us of our promises and provides spiritual protection.</p>
      <p>The initiatory ordinances are beautiful expressions of God's love for us and His desire to bless us with spiritual strength and protection.</p>
    `
  },
  7: {
    title: "Temple Garments",
    content: `
      <h1>Temple Garments</h1>
      <p>The temple garment is a sacred underclothing worn by members who have received their endowment. It serves as a constant reminder of the covenants made in the temple.</p>
      <p>The garment represents the covering God provided for Adam and Eve in the Garden of Eden. It symbolizes modesty, purity, and the protective power of keeping our covenants.</p>
      <p>Wearing the garment day and night serves as a personal reminder of our temple experience and our commitment to live righteously.</p>
      <p>Treating the garment with respect demonstrates our reverence for sacred things and our commitment to honor our temple covenants.</p>
    `
  },
  8: {
    title: "The Endowment Ceremony",
    content: `
      <h1>The Endowment Ceremony</h1>
      <p>The endowment is a gift of spiritual power and blessing from God. During this sacred ordinance, we make covenants and receive instruction about the purpose of life and our relationship with God.</p>
      <p>The endowment teaches us symbolically about the Creation, the Fall, and the Atonement of Jesus Christ. It helps us understand our place in God's plan and the path back to His presence.</p>
      <p>Through the endowment, we receive knowledge, power, and blessings that prepare us for eternal life. These blessings are fully realized as we faithfully keep our covenants.</p>
      <p>The endowment is a sacred experience that should be approached with reverence, preparation, and a desire to learn.</p>
    `
  },
  9: {
    title: "Temple Worthiness",
    content: `
      <h1>Temple Worthiness</h1>
      <p>Attending the temple requires spiritual preparation and worthiness. This worthiness is determined through interviews with priesthood leaders, who ask questions about our faith, conduct, and commitment.</p>
      <p>Being temple worthy doesn't mean being perfect. It means sincerely striving to live gospel principles and keep the commandments. It means repenting when we fall short and continually trying to improve.</p>
      <p>Temple worthiness includes having faith in God, supporting Church leaders, maintaining moral cleanliness, honoring family commitments, keeping the Word of Wisdom, paying tithing, and being honest.</p>
      <p>Maintaining temple worthiness brings blessings of peace, spiritual strength, and closeness to God, even during times when we may not be able to attend the temple regularly.</p>
    `
  },
  10: {
    title: "Summary",
    content: `
      <h1>Course Summary</h1>
      <p>Throughout this course, we've explored the purpose and significance of temples, the covenants we make there, and how to prepare ourselves spiritually for temple attendance.</p>
      <p>We've learned that temples are sacred places where we draw closer to God, make essential covenants, and receive ordinances necessary for exaltation.</p>
      <p>We've discussed the importance of worthiness, preparation, and reverence in approaching temple worship.</p>
      <p>As you prepare to attend the temple, remember that it is a place of peace, learning, and spiritual growth. The covenants you make there will bless your life and bring you closer to God.</p>
      <p>May your temple experience be sacred and meaningful, and may you return often to renew your covenants and deepen your understanding of God's plan for you.</p>
    `
  }
};

export const ModulePage: React.FC = () => {
  const { modules, completeModule } = useModuleContext();
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [showComprehensionCheck, setShowComprehensionCheck] = useState(false);
  
  // Convert moduleId to number
  const id = moduleId ? parseInt(moduleId, 10) : 0;
  
  // Find the current module
  const currentModule = modules.find(m => m.id === id);
  
  if (!currentModule) {
    return <div>Module not found</div>;
  }
  
  // Get module content
  const moduleContent = moduleContents[id] || { 
    title: currentModule.title, 
    content: "<p>Content for this module is being developed.</p>" 
  };
  
  const handleCompleteModule = () => {
    setShowComprehensionCheck(true);
  };
  
  const handleCorrectAnswer = () => {
    // Mark the module as completed
    completeModule(id);
    
    // Navigate back to the module list
    setTimeout(() => {
      navigate('/modules-dupe');
    }, 1500);
  };
  
  const handleCloseComprehensionCheck = () => {
    setShowComprehensionCheck(false);
  };
  
  return (
    <div className={styles.modulePage}>
      <div className={styles.moduleHeader}>
        <h1>{currentModule.title}</h1>
        <div className={styles.moduleStatus}>
          Status: <span className={styles[currentModule.status]}>{currentModule.status}</span>
        </div>
      </div>
      
      <div 
        className={styles.moduleContent}
        dangerouslySetInnerHTML={{ __html: moduleContent.content }}
      />
      
      <div className={styles.moduleActions}>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/modules-dupe')}
        >
          Back to Modules
        </button>
        
        {currentModule.status === 'active' && (
          <button 
            className={styles.completeButton}
            onClick={handleCompleteModule}
          >
            Complete Module
          </button>
        )}
      </div>
      
      {showComprehensionCheck && (
        <ComprehensionCheck 
          moduleId={id}
          onCorrectAnswer={handleCorrectAnswer}
          onClose={handleCloseComprehensionCheck}
        />
      )}
    </div>
  );
};
