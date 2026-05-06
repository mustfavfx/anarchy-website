export async function sendChatMessage(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]): Promise<string> {
  // For now, return a simple response since this is a static site
  // In production, this would call Replicate API with the API key
  
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase();
  
  // Simple keyword-based responses for demo
  if (lastUserMessage.includes('price') || lastUserMessage.includes('cost') || lastUserMessage.includes('credit')) {
    return 'Anarchy AI uses a pay-as-you-go credit system. Standard generation costs 3 credits, HD costs 25 credits, 4K costs 40 credits, and Premium costs 90 credits. Credits can be purchased in packages starting from $5.';
  }
  
  if (lastUserMessage.includes('download') || lastUserMessage.includes('install') || lastUserMessage.includes('windows')) {
    return 'Anarchy AI is currently available for Windows. You can download it from the Download section on this website.';
  }
  
  if (lastUserMessage.includes('feature') || lastUserMessage.includes('what') || lastUserMessage.includes('how')) {
    return 'Anarchy AI features a visual node editor for building AI workflows, multi-stage processing, batch processing, and collaboration tools. It supports image generation, video generation, and image upscaling using state-of-the-art AI models.';
  }
  
  if (lastUserMessage.includes('model') || lastUserMessage.includes('ai') || lastUserMessage.includes('flux')) {
    return 'Anarchy AI uses multiple AI models including flux-schnell for fast generation, flux-dev for HD quality, flux-1.1-pro for 4K quality, and ideogram-v3 for premium results. All models are powered by Replicate API.';
  }
  
  // Default response for unrelated topics
  return 'I can only help with questions about Anarchy AI software. Please ask about features, pricing, download, or how to use the software.';
}
