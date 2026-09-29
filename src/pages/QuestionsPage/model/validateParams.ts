const LIMIT_MIN = 1;
const LIMIT_MAX = 50;
    
    export interface ValidatedQuizzParams {
      specialization: number;
      limit: number;
      complexity?: number[];
      skills?: string[];
      mode:string;
    }
    
    export function parseQuizzParams(searchParams: URLSearchParams): ValidatedQuizzParams | null {
      const rawSpec = searchParams.get('specialization');
      const rawLimit = searchParams.get('limit');
      const mode=searchParams.get("mode") ||'';
      const specialization = Number(rawSpec);
      if (!Number.isInteger(specialization) || specialization <= 0) {
        return null;
      }
    
      const limit = Number(rawLimit);
      if (!Number.isInteger(limit) || limit < LIMIT_MIN || limit > LIMIT_MAX) {
        return null;
      }
    
 
      const rawComplexity = searchParams.get('complexity');
      let complexity: number[] | undefined;
      if (rawComplexity) {
        const parsed = rawComplexity.split(',').map(Number);
        if (parsed.every((n) => Number.isInteger(n) && n >= 1 && n <= 10)) {
          complexity = parsed;
        }
      }
    
      const rawSkills = searchParams.get('skills');
      const skills = rawSkills ? rawSkills.split(',').filter(Boolean) : undefined;
    
      return { specialization, limit, complexity, skills ,mode};
    }