import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Test } from '@nestjs/testing';

describe('CommentController', () => {
  let commentController: CommentController
  let commentService: CommentService

  beforeEach(async () => {
    commentController = new CommentController(commentService);

    const moduleRef = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService],
      // imports: [CommentService]
    }).compile();

    commentService = moduleRef.get<CommentService>(CommentService);
    commentController = moduleRef.get<CommentController>(CommentController);

  })

  describe('findAll', () => {
    it('Should return []', async () => {
      const result: any = [];
      jest.spyOn(commentController, 'search').mockImplementation(() => result)

      expect(await commentController.search({ issueId: 1 })).toBe(result);
    })
  })
})
