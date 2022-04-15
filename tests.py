import unittest
import app


class TestCase(unittest.TestCase):

    def test1(self):
        expected = "Hello World"
        self.assertEqual(app.my_func(), expected)

    def test2(self):
        expected = "Goodbye World"
        self.assertNotEqual(app.my_func(), expected)


if __name__ == '__main__':
    unittest.main()
