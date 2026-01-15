import { AssistantRequest, AssistantResponse } from './types';
import { logger } from '../logger';

export class ApplicationAssistant {
  
  static generateSummary(req: AssistantRequest): AssistantResponse {
    logger.info('Generating tailored professional summary');
    
    // Naive generation logic for demonstration
    const { resume, job } = req;
    
    const relevantSkills = resume.skills.filter(s => 
      job.requirements.skills.map(js => js.toLowerCase()).includes(s.toLowerCase())
    );

    let content = \`Highly motivated professional with experience in \${resume.skills.slice(0, 3).join(', ')}.\`;
    
    if (relevantSkills.length > 0) {
      content += \` Strong alignment with \${job.title} role, bringing expertise in \${relevantSkills.join(', ')}.\`;
    }

    return {
      success: true,
      content,
      confidenceScore: 0.85,
      sources: ['resume.skills', 'job.requirements']
    };
  }

  static generateSuggestion(req: AssistantRequest): AssistantResponse {
    const { resume, job } = req;
    
    const missingSkills = job.requirements.skills.filter(js => 
      !resume.skills.map(rs => rs.toLowerCase()).includes(js.toLowerCase())
    );

    let content = "Your resume looks well-tailored for this position.";
    if (missingSkills.length > 0) {
      content = \`Consider adding experience related to: \${missingSkills.join(', ')} if you have used them in past roles.\`;
    }

    return {
      success: true,
      content,
      confidenceScore: 0.9,
      sources: ['matcher.missingSkills']
    };
  }

  static answerQuestion(req: AssistantRequest): AssistantResponse {
    if (!req.question) {
      return {
        success: false,
        content: '',
        confidenceScore: 0,
        sources: [],
        error: 'Question is required'
      };
    }

    // In a real application, this would call an LLM with strict grounding constraints
    const content = \`Based strictly on the provided resume, I cannot answer '\${req.question}' confidently.\`;

    return {
      success: true,
      content,
      confidenceScore: 0.2,
      sources: []
    };
  }

  static processRequest(req: AssistantRequest): AssistantResponse {
    try {
      switch (req.promptType) {
        case 'summary':
          return this.generateSummary(req);
        case 'suggestion':
          return this.generateSuggestion(req);
        case 'qa':
          return this.answerQuestion(req);
        default:
          throw new Error('Unsupported prompt type');
      }
    } catch (error: any) {
      logger.error('Assistant failed to process request', error);
      return {
        success: false,
        content: '',
        confidenceScore: 0,
        sources: [],
        error: error.message
      };
    }
  }
}
